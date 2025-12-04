import React, { useState, useRef } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import TextToSpeech from "./TextToSpeech";
import Tts from "react-native-tts";
type Marker = {
    id: string;
    name: string;
    image: string;
    category: string;
    latitude: number;
    longitude: number;
    audio?: string;
    openingHours?: Record<string, { open: string; close: string; closed: boolean }>;
    address?: string;
    description?: string;
};

type LandmarkDetailModalProps = {
    visible: boolean;
    marker: Marker | null;
    onClose: () => void;
    onNavigate: (marker: Marker) => void;
    getOpenStatus: (marker: Marker) => string;
};

const LandmarkDetailModal = ({
    visible,
    marker,
    onClose,
    onNavigate,
    getOpenStatus,
}: LandmarkDetailModalProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
 
    const videoRef = useRef<Video>(null);

    if (!marker) return null;

    const status = getOpenStatus(marker);
    const isAvailable = status.toLowerCase().includes("open");
    const isUnavailable = status.toLowerCase().includes("closed");

    const statusColor = isAvailable ? "#28a745" : isUnavailable ? "#dc3545" : "#6c757d";

 

    const handleClose = () => {
      
        setIsPlaying(false);

     
        Tts.stop();

      
        onClose();
    };


    const handleAudioToggle = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
           

            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: marker.image }}
                        style={styles.modalImage}
                    />
                    <TextToSpeech
                        style={{
                            position: "absolute",
                            right: 10,
                            top: 160
                        }
                        }
                        textToSpeak={marker.description}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Icon name="close-circle" size={30} color="#fff" />
                    </TouchableOpacity>

                    <ScrollView
                        style={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                      
                            
                        <Text style={styles.modalCategory}>{marker.category.toUpperCase()}</Text>
              
                        <Text style={styles.modalTitle}>{marker.name}</Text>
                        
                    
                        {/* Status Section */}
                        <View style={styles.infoRow}>
                            <Icon name="time-outline" size={18} color={statusColor} />
                            <Text style={[styles.modalStatus, { color: statusColor }]}>{status}</Text>
                        </View>

                        {/* Address Section */}
                        <View style={styles.infoRow}>
                            <Icon name="location-outline" size={18} color="#493628" />
                            <Text style={styles.modalAddress}>{marker.address}</Text>
                        </View>

                       

                        <Text style={styles.modalDescription}>{marker.description}</Text>
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.navigateButton}
                        onPress={() => {
                            handleClose();
                            onNavigate(marker);
                        }}

                    >
                        <Text style={styles.navigateButtonText}>Navigate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    audioControlWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    audioPlayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8A6F57",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    audioLabel: {
        color: "#6B5E5E",
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContainer: {
        width: "100%",
        maxHeight: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalImage: {
        width: "100%",
        height: 220,
    },
    closeButton: {
        position: "absolute",
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 15,
        zIndex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    modalCategory: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8A6F57',
        marginBottom: 4,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#493628",
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalStatus: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 8,
    },
    modalAddress: {
        color: "#493628",
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    modalDescription: {
        color: "#6B5E5E",
        fontSize: 14,
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 20,
    },
    navigateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: "#493628",
        margin: 20,
        borderRadius: 12,
    },
    navigateButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default LandmarkDetailModal;