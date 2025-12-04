// components/SpeechButton.tsx
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { TouchableOpacity, Text, Image, StyleSheet, ViewStyle } from "react-native";
import Tts from "react-native-tts";

interface SpeechButtonProps {
    textToSpeak: string;
    style?: ViewStyle;
}

export interface SpeechButtonRef {
    stop: () => void;
}


const SpeechButton = forwardRef<SpeechButtonRef, SpeechButtonProps>(({ textToSpeak, style }, ref) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        Tts.addEventListener("tts-start", () => setIsSpeaking(true));
        Tts.addEventListener("tts-finish", () => setIsSpeaking(false));
        Tts.addEventListener("tts-cancel", () => setIsSpeaking(false));

        return () => {
            Tts.removeAllListeners("tts-start");
            Tts.removeAllListeners("tts-finish");
            Tts.removeAllListeners("tts-cancel");
        };
    }, []);

    const handleToggle = () => {
        if (isSpeaking) {
            Tts.stop();
        } else if (textToSpeak?.trim()) {
            Tts.setDefaultRate(0.45);
            Tts.setDefaultPitch(1.2);
            Tts.speak(textToSpeak);
        } else {
            Tts.speak("No description available.");
        }
    };

    // Expose stop method to parent via ref
    useImperativeHandle(ref, () => ({
        stop: () => {
            if (isSpeaking) Tts.stop();
        },
    }));

    return (
        <TouchableOpacity
            style={[styles.speechButton, style, { backgroundColor: isSpeaking ? "#dc3545" : "#4E342E" }]}
            onPress={handleToggle}
            activeOpacity={0.8}
        >
            <Text style={styles.speechButtonText}>
                {isSpeaking ? (
                    <Image style={styles.icon} source={require("../assets/stop-button.png")} />
                ) : (
                    <Image style={styles.icon} source={require("../assets/volume.png")} />
                )}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    speechButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    speechButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#fff",
    },
});

export default SpeechButton;
