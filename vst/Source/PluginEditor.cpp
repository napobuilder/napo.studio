#include "PluginProcessor.h"
#include "PluginEditor.h"

NapbakConcertGrandAudioProcessorEditor::NapbakConcertGrandAudioProcessorEditor (NapbakConcertGrandAudioProcessor& p)
    : AudioProcessorEditor (&p),
      processorRef (p),
      keyboardComponent (p.getKeyboardState(), juce::MidiKeyboardComponent::horizontalKeyboard)
{
    // 1. Configure Knobs Helper Lambda
    auto setupKnob = [this] (juce::Slider& slider, juce::Label& label, const juce::String& text)
    {
        slider.setSliderStyle (juce::Slider::RotaryVerticalDrag);
        slider.setTextBoxStyle (juce::Slider::TextBoxBelow, false, 70, 18);
        slider.setColour (juce::Slider::rotarySliderFillColourId, juce::Colour::fromRGB (157, 78, 221));   // #9D4EDD
        slider.setColour (juce::Slider::thumbColourId, juce::Colour::fromRGB (224, 170, 255));             // #E0AAFF
        slider.setColour (juce::Slider::rotarySliderOutlineColourId, juce::Colour::fromRGBA (255, 255, 255, 25));
        slider.setColour (juce::Slider::textBoxTextColourId, juce::Colour::fromRGB (224, 170, 255));
        slider.setColour (juce::Slider::textBoxOutlineColourId, juce::Colours::transparentBlack);
        addAndMakeVisible (slider);

        label.setText (text, juce::dontSendNotification);
        label.setFont (juce::FontOptions (11.0f));
        label.setColour (juce::Label::textColourId, juce::Colour::fromRGBA (255, 255, 255, 180));
        label.setJustificationType (juce::Justification::centred);
        addAndMakeVisible (label);
    };

    setupKnob (volumeSlider,  volumeLabel,  "MASTER VOL");
    setupKnob (reverbSlider,  reverbLabel,  "CONCERT REVERB");
    setupKnob (warmthSlider,  warmthLabel,  "WARMTH / FELT");
    setupKnob (releaseSlider, releaseLabel, "RELEASE TIME");

    // 2. Attachments to APVTS for full DAW Automation
    auto& apvts = processorRef.getAPVTS();
    volumeAttachment  = std::make_unique<juce::AudioProcessorValueTreeState::SliderAttachment> (apvts, "volume",  volumeSlider);
    reverbAttachment  = std::make_unique<juce::AudioProcessorValueTreeState::SliderAttachment> (apvts, "reverb",  reverbSlider);
    warmthAttachment  = std::make_unique<juce::AudioProcessorValueTreeState::SliderAttachment> (apvts, "warmth",  warmthSlider);
    releaseAttachment = std::make_unique<juce::AudioProcessorValueTreeState::SliderAttachment> (apvts, "release", releaseSlider);

    // 3. Setup On-Screen Piano Keyboard
    keyboardComponent.setKeyWidth (20.0f);
    keyboardComponent.setColour (juce::MidiKeyboardComponent::whiteNoteColourId, juce::Colour::fromRGB (240, 240, 240));
    keyboardComponent.setColour (juce::MidiKeyboardComponent::blackNoteColourId, juce::Colour::fromRGB (18, 18, 18));
    keyboardComponent.setColour (juce::MidiKeyboardComponent::keyDownOverlayColourId, juce::Colour::fromRGBA (157, 78, 221, 220)); // Neon purple on press!
    keyboardComponent.setColour (juce::MidiKeyboardComponent::mouseOverKeyOverlayColourId, juce::Colour::fromRGBA (157, 78, 221, 90));
    addAndMakeVisible (keyboardComponent);

    // 4. Load Embedded Brand Logo
    logoImage = juce::ImageCache::getFromMemory (BinaryData::napbak_logo_png, BinaryData::napbak_logo_pngSize);

    // Overall Workstation Dimensions
    setSize (780, 420);
}

NapbakConcertGrandAudioProcessorEditor::~NapbakConcertGrandAudioProcessorEditor()
{
}

void NapbakConcertGrandAudioProcessorEditor::paint (juce::Graphics& g)
{
    // 1. Dark Brushed Background
    juce::ColourGradient bgGradient (
        juce::Colour::fromRGB (14, 14, 14),
        getWidth() * 0.5f, 0.0f,
        juce::Colour::fromRGB (6, 6, 6),
        getWidth() * 0.5f, static_cast<float> (getHeight()),
        false
    );
    g.setGradientFill (bgGradient);
    g.fillAll();

    // 2. Subtle Violet Backlight Halo
    juce::ColourGradient glowGradient (
        juce::Colour::fromRGBA (157, 78, 221, 35),
        getWidth() * 0.5f, 40.0f,
        juce::Colour::fromRGBA (157, 78, 221, 0),
        getWidth() * 0.5f, 200.0f,
        true
    );
    g.setGradientFill (glowGradient);
    g.fillEllipse (getWidth() * 0.5f - 250.0f, 0.0f, 500.0f, 220.0f);

    // 3. Outer Edge Frame
    g.setColour (juce::Colour::fromRGBA (157, 78, 221, 70));
    g.drawRoundedRectangle (getLocalBounds().toFloat().reduced (1.5f), 10.0f, 1.5f);

    // 4. Header Section with Brand Logo
    if (logoImage.isValid())
    {
        g.drawImage (logoImage, 24.0f, 16.0f, 46.0f, 46.0f, 
                     0, 0, logoImage.getWidth(), logoImage.getHeight());

        g.setColour (juce::Colours::white);
        g.setFont (juce::FontOptions (21.0f));
        g.drawText ("NAPBAK CONCERT GRAND", 82, 17, 400, 24, juce::Justification::left);

        g.setColour (juce::Colour::fromRGB (224, 170, 255)); // #E0AAFF
        g.setFont (juce::FontOptions (10.0f));
        g.drawText ("STUDIO ACOUSTIC GRAND // ZERO-LATENCY PHYSICAL MODELING", 84, 43, 500, 16, juce::Justification::left);
    }
    else
    {
        g.setColour (juce::Colours::white);
        g.setFont (juce::FontOptions (22.0f));
        g.drawText ("NAPBAK CONCERT GRAND", 30, 20, 400, 28, juce::Justification::left);

        g.setColour (juce::Colour::fromRGB (224, 170, 255)); // #E0AAFF
        g.setFont (juce::FontOptions (10.0f));
        g.drawText ("STUDIO ACOUSTIC GRAND // ZERO-LATENCY PHYSICAL MODELING", 32, 46, 500, 16, juce::Justification::left);
    }

    // 5. Tech Corner Badges
    g.setColour (juce::Colour::fromRGBA (255, 255, 255, 70));
    g.setFont (juce::FontOptions (9.0f));
    g.drawText ("[ 88-KEY SAMPLED // VST3 NATIVE ]", getWidth() - 250, 25, 220, 20, juce::Justification::right);
    g.drawText ("[ NAPBAK AUDIO LAB v1.0 ]", getWidth() - 250, 42, 220, 20, juce::Justification::right);

    // 6. Section Dividers
    g.setColour (juce::Colour::fromRGBA (255, 255, 255, 15));
    g.drawLine (20.0f, 75.0f, getWidth() - 20.0f, 75.0f, 1.0f);
    g.drawLine (20.0f, 260.0f, getWidth() - 20.0f, 260.0f, 1.0f);
}

void NapbakConcertGrandAudioProcessorEditor::resized()
{
    // Layout Knobs in Center Row
    const int knobY = 95;
    const int knobWidth = 110;
    const int knobHeight = 115;
    const int labelHeight = 20;

    int totalKnobsWidth = knobWidth * 4;
    int spacing = (getWidth() - totalKnobsWidth) / 5;

    for (int i = 0; i < 4; ++i)
    {
        int x = spacing + i * (knobWidth + spacing);

        if (i == 0)
        {
            volumeSlider.setBounds (x, knobY, knobWidth, knobHeight);
            volumeLabel.setBounds (x, knobY + knobHeight + 4, knobWidth, labelHeight);
        }
        else if (i == 1)
        {
            reverbSlider.setBounds (x, knobY, knobWidth, knobHeight);
            reverbLabel.setBounds (x, knobY + knobHeight + 4, knobWidth, labelHeight);
        }
        else if (i == 2)
        {
            warmthSlider.setBounds (x, knobY, knobWidth, knobHeight);
            warmthLabel.setBounds (x, knobY + knobHeight + 4, knobWidth, labelHeight);
        }
        else if (i == 3)
        {
            releaseSlider.setBounds (x, knobY, knobWidth, knobHeight);
            releaseLabel.setBounds (x, knobY + knobHeight + 4, knobWidth, labelHeight);
        }
    }

    // Keyboard at the bottom
    keyboardComponent.setBounds (10, 275, getWidth() - 20, 135);
}
