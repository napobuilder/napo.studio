cmake_minimum_required(VERSION 3.22)

project(NapbakConcertGrand VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Fetch official JUCE framework (modular and lightweight)
include(FetchContent)
FetchContent_Declare(
    JUCE
    GIT_REPOSITORY https://github.com/juce-framework/JUCE.git
    GIT_TAG        8.0.4
    GIT_SHALLOW    TRUE
)
FetchContent_MakeAvailable(JUCE)

# Configure VST3 and Standalone Plugin
juce_add_plugin(NapbakConcertGrand
    COMPANY_NAME "Napbak Studio"
    IS_SYNTH TRUE
    NEEDS_MIDI_INPUT TRUE
    NEEDS_MIDI_OUTPUT FALSE
    IS_MIDI_EFFECT FALSE
    EDITOR_WANTS_KEYBOARD_FOCUS TRUE
    COPY_PLUGIN_AFTER_BUILD FALSE
    PLUGIN_MANUFACTURER_CODE Napb
    PLUGIN_CODE NpGr
    FORMATS VST3 Standalone
    PRODUCT_NAME "Napbak Concert Grand"
)

# Embed Brand Assets
juce_add_binary_data(NapbakBinaryData
    SOURCES
        Assets/napbak_logo.png
)

# Target sources
target_sources(NapbakConcertGrand PRIVATE
    Source/PluginProcessor.cpp
    Source/PluginProcessor.h
    Source/PluginEditor.cpp
    Source/PluginEditor.h
)

# Link essential JUCE modules
target_link_libraries(NapbakConcertGrand PRIVATE
    NapbakBinaryData
    juce::juce_audio_utils
    juce::juce_audio_processors
    juce::juce_dsp
    juce::juce_gui_basics
    juce::juce_gui_extra
    PUBLIC
    juce::juce_recommended_config_flags
    juce::juce_recommended_lto_flags
    juce::juce_recommended_warning_flags
)
