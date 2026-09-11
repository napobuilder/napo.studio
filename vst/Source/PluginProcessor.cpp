#include "PluginProcessor.h"
#include "PluginEditor.h"

NapbakConcertGrandAudioProcessor::NapbakConcertGrandAudioProcessor()
    : AudioProcessor (BusesProperties().withOutput ("Output", juce::AudioChannelSet::stereo(), true)),
      apvts (*this, nullptr, "Parameters", createParameterLayout())
{
    formatManager.registerBasicFormats();

    // Add 16 Sampler voices for polyphony
    for (int i = 0; i < 16; ++i)
        synth.addVoice (new juce::SamplerVoice());

    loadSamples();
}

NapbakConcertGrandAudioProcessor::~NapbakConcertGrandAudioProcessor()
{
}

juce::AudioProcessorValueTreeState::ParameterLayout NapbakConcertGrandAudioProcessor::createParameterLayout()
{
    std::vector<std::unique_ptr<juce::RangedAudioParameter>> params;

    params.push_back (std::make_unique<juce::AudioParameterFloat> (
        juce::ParameterID { "volume", 1 }, "Master Volume",
        juce::NormalisableRange<float> (0.0f, 1.0f, 0.01f), 0.85f));

    params.push_back (std::make_unique<juce::AudioParameterFloat> (
        juce::ParameterID { "reverb", 1 }, "Concert Reverb",
        juce::NormalisableRange<float> (0.0f, 1.0f, 0.01f), 0.35f));

    params.push_back (std::make_unique<juce::AudioParameterFloat> (
        juce::ParameterID { "warmth", 1 }, "Tone / Warmth",
        juce::NormalisableRange<float> (0.0f, 1.0f, 0.01f), 0.75f));

    params.push_back (std::make_unique<juce::AudioParameterFloat> (
        juce::ParameterID { "release", 1 }, "Release Time",
        juce::NormalisableRange<float> (0.1f, 3.0f, 0.05f), 0.60f));

    return { params.begin(), params.end() };
}

static juce::File findSamplesDirectory()
{
    auto exeDir = juce::File::getSpecialLocation (juce::File::currentExecutableFile).getParentDirectory();
    
    // 1. Next to binary
    if (exeDir.getChildFile ("Samples").isDirectory())
        return exeDir.getChildFile ("Samples");

    // 2. VST3 bundle Resources folder
    auto v3Res = exeDir.getParentDirectory().getChildFile ("Resources").getChildFile ("Samples");
    if (v3Res.isDirectory())
        return v3Res;

    // 3. User VST3 directory in %LOCALAPPDATA%
    auto localApp = juce::File::getSpecialLocation (juce::File::userApplicationDataDirectory).getParentDirectory().getChildFile ("Local");
    auto userPath = localApp.getChildFile ("Programs").getChildFile ("Common").getChildFile ("VST3")
                            .getChildFile ("Napbak Concert Grand.vst3").getChildFile ("Contents").getChildFile ("Resources").getChildFile ("Samples");
    if (userPath.isDirectory())
        return userPath;

    // 4. Fallback dev directory
    juce::File devPath ("C:/Users/Napoleon/Desktop/napbakstudio/NapbakStudio/vst/Samples");
    if (devPath.isDirectory())
        return devPath;

    return {};
}

void NapbakConcertGrandAudioProcessor::loadSamples()
{
    synth.clearSounds();

    auto samplesDir = findSamplesDirectory();
    if (!samplesDir.isDirectory())
        return;

    const std::vector<int> sampleMidis = {
        21, 24, 27, 30, 33, 36, 39, 42, 45, 48,
        51, 54, 57, 60, 63, 66, 69, 72, 75, 78,
        81, 84, 87, 90, 93, 96, 99, 102, 105, 108
    };

    const std::vector<juce::String> sampleNames = {
        "A0", "C1", "Eb1", "Gb1", "A1", "C2", "Eb2", "Gb2", "A2", "C3",
        "Eb3", "Gb3", "A3", "C4", "Eb4", "Gb4", "A4", "C5", "Eb5", "Gb5",
        "A5", "C6", "Eb6", "Gb6", "A6", "C7", "Eb7", "Gb7", "A7", "C8"
    };

    const int total = static_cast<int> (sampleMidis.size());

    for (int i = 0; i < total; ++i)
    {
        int root = sampleMidis[i];
        int loNote = (i == 0) ? 21 : ((sampleMidis[i - 1] + root) / 2) + 1;
        int hiNote = (i == total - 1) ? 108 : ((root + sampleMidis[i + 1]) / 2);

        juce::BigInteger midiNotes;
        midiNotes.setRange (loNote, hiNote - loNote + 1, true);

        auto file = samplesDir.getChildFile (sampleNames[i] + ".mp3");
        if (file.existsAsFile())
        {
            std::unique_ptr<juce::AudioFormatReader> reader (formatManager.createReaderFor (file));
            if (reader != nullptr)
            {
                synth.addSound (new juce::SamplerSound (
                    sampleNames[i],
                    *reader,
                    midiNotes,
                    root,
                    0.002, // attack
                    0.60,  // release
                    10.0   // max length seconds
                ));
            }
        }
    }
}

const juce::String NapbakConcertGrandAudioProcessor::getName() const
{
    return JucePlugin_Name;
}

bool NapbakConcertGrandAudioProcessor::acceptsMidi() const
{
    return true;
}

bool NapbakConcertGrandAudioProcessor::producesMidi() const
{
    return false;
}

bool NapbakConcertGrandAudioProcessor::isMidiEffect() const
{
    return false;
}

double NapbakConcertGrandAudioProcessor::getTailLengthSeconds() const
{
    return 2.0;
}

int NapbakConcertGrandAudioProcessor::getNumPrograms()
{
    return 1;
}

int NapbakConcertGrandAudioProcessor::getCurrentProgram()
{
    return 0;
}

void NapbakConcertGrandAudioProcessor::setCurrentProgram (int)
{
}

const juce::String NapbakConcertGrandAudioProcessor::getProgramName (int)
{
    return {};
}

void NapbakConcertGrandAudioProcessor::changeProgramName (int, const juce::String&)
{
}

void NapbakConcertGrandAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    synth.setCurrentPlaybackSampleRate (sampleRate);

    juce::dsp::ProcessSpec spec;
    spec.sampleRate = sampleRate;
    spec.maximumBlockSize = static_cast<juce::uint32> (samplesPerBlock);
    filter.setType (juce::dsp::StateVariableTPTFilterType::lowpass);
    filter.prepare (spec);

    reverb.prepare (spec);
    reverb.reset();
    reverbParams.roomSize = 0.80f;
    reverbParams.damping = 0.35f;
    reverbParams.width = 1.0f;
    reverbParams.freezeMode = 0.0f;
    reverb.setParameters (reverbParams);

    masterGain.prepare (spec);
    masterGain.setRampDurationSeconds (0.02);
}

void NapbakConcertGrandAudioProcessor::releaseResources()
{
}

bool NapbakConcertGrandAudioProcessor::isBusesLayoutSupported (const BusesLayout& layouts) const
{
    if (layouts.getMainOutputChannelSet() != juce::AudioChannelSet::mono()
     && layouts.getMainOutputChannelSet() != juce::AudioChannelSet::stereo())
        return false;

    return true;
}

void NapbakConcertGrandAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer& midiMessages)
{
    juce::ScopedNoDenormals noDenormals;

    // 1. Process MIDI and sync with on-screen keyboard
    keyboardState.processNextMidiBuffer (midiMessages, 0, buffer.getNumSamples(), true);

    // 2. Clear buffers before synthesis
    auto totalNumOutputChannels = getTotalNumOutputChannels();
    for (auto i = 0; i < totalNumOutputChannels; ++i)
        buffer.clear (i, 0, buffer.getNumSamples());

    // 3. Render Acoustic Piano Voices
    synth.renderNextBlock (buffer, midiMessages, 0, buffer.getNumSamples());

    // 4. Warmth Filter (Lowpass Tone)
    float warmthVal = apvts.getRawParameterValue ("warmth")->load();
    float minFreq = 600.0f;
    float maxFreq = 18000.0f;
    float cutoff = minFreq * std::pow (maxFreq / minFreq, warmthVal);
    filter.setCutoffFrequency (cutoff);

    juce::dsp::AudioBlock<float> block (buffer);
    juce::dsp::ProcessContextReplacing<float> context (block);
    filter.process (context);

    // 5. Concert Hall Reverb DSP
    float reverbVal = apvts.getRawParameterValue ("reverb")->load();
    if (reverbVal > 0.01f && buffer.getNumChannels() >= 2)
    {
        reverbParams.wetLevel = reverbVal * 0.70f;
        reverbParams.dryLevel = 1.0f - (reverbVal * 0.30f);
        reverb.setParameters (reverbParams);
        reverb.process (context);
    }

    // 6. Master Volume
    float volVal = apvts.getRawParameterValue ("volume")->load();
    masterGain.setGainLinear (volVal);
    masterGain.process (context);
}

bool NapbakConcertGrandAudioProcessor::hasEditor() const
{
    return true;
}

juce::AudioProcessorEditor* NapbakConcertGrandAudioProcessor::createEditor()
{
    return new NapbakConcertGrandAudioProcessorEditor (*this);
}

void NapbakConcertGrandAudioProcessor::getStateInformation (juce::MemoryBlock& destData)
{
    auto state = apvts.copyState();
    std::unique_ptr<juce::XmlElement> xml (state.createXml());
    copyXmlToBinary (*xml, destData);
}

void NapbakConcertGrandAudioProcessor::setStateInformation (const void* data, int sizeInBytes)
{
    std::unique_ptr<juce::XmlElement> xmlState (getXmlFromBinary (data, sizeInBytes));
    if (xmlState != nullptr && xmlState->hasTagName (apvts.state.getType()))
        apvts.replaceState (juce::ValueTree::fromXml (*xmlState));
}

// Plugin entry point
juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new NapbakConcertGrandAudioProcessor();
}
