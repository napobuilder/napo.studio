#pragma once

#include <juce_gui_basics/juce_gui_basics.h>
#include <juce_audio_utils/juce_audio_utils.h>
#include <BinaryData.h>
#include "PluginProcessor.h"

class NapbakConcertGrandAudioProcessorEditor : public juce::AudioProcessorEditor
{
public:
    explicit NapbakConcertGrandAudioProcessorEditor (NapbakConcertGrandAudioProcessor&);
    ~NapbakConcertGrandAudioProcessorEditor() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    NapbakConcertGrandAudioProcessor& processorRef;

    // Brand Logo
    juce::Image logoImage;

    // Rotary Knobs
    juce::Slider volumeSlider;
    juce::Slider reverbSlider;
    juce::Slider warmthSlider;
    juce::Slider releaseSlider;

    // Knob Labels
    juce::Label volumeLabel;
    juce::Label reverbLabel;
    juce::Label warmthLabel;
    juce::Label releaseLabel;

    // Parameter Attachments for FL Studio Automation
    std::unique_ptr<juce::AudioProcessorValueTreeState::SliderAttachment> volumeAttachment;
    std::unique_ptr<juce::AudioProcessorValueTreeState::SliderAttachment> reverbAttachment;
    std::unique_ptr<juce::AudioProcessorValueTreeState::SliderAttachment> warmthAttachment;
    std::unique_ptr<juce::AudioProcessorValueTreeState::SliderAttachment> releaseAttachment;

    // Interactive On-Screen Piano Keyboard
    juce::MidiKeyboardComponent keyboardComponent;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (NapbakConcertGrandAudioProcessorEditor)
};
