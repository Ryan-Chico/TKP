/* eslint-disable */
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Text, Image, View } from "react-native";
import { useLandmark } from "~/provider/LandmarkProvider";
import palacio from "../assets/palacio.jpg";
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SelectedLandmarkSheet() {
    const { selectedLandmark} = useLandmark();
    const bottomSheetRef = useRef<BottomSheet>(null);
   useEffect(() => {
    console.log("Selected Landmark:", selectedLandmark);
    if (selectedLandmark) {
        bottomSheetRef.current?.expand();
    }
}, [selectedLandmark]);
   
    return (
        <BottomSheet 
        backgroundStyle={{ backgroundColor: "#D6C0B3",}} 
         ref ={bottomSheetRef} index={-1} enableDynamicSizing enablePanDownToClose>
            <BottomSheetView style={{ padding: 10 }}>
                <View style={{ flexDirection: "column", justifyContent: "space-between", gap: 10 }}>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={{
                        color: "#6B5E5E",
                    }}>AR Camera Supported</Text>
                        <View style={{ flexDirection: "row", gap: 5, justifyContent: "flex-end", flex: 1 }}>

                            <View style={{ flexDirection: "row", gap: 5 }}>
                            <FontAwesome5 name="route" size={15} color="black" />       
                                <Text>25 min</Text>     
                    </View>
                            <View style={{ flexDirection: "row", gap: 5 }}>
                            <Entypo name="back-in-time" size={18} color="black" />
                            <Text>5 km</Text>
                    </View>
                    </View>
                  
                   
                </View>

 
                 <View style={{flexDirection: "row", }}>

                    <View style={{flex:1}}>                       
                        <Image source={palacio} style={{
                            height: 100,
                            width: 175,
                            
                        }} />
                    </View>
  
                    <View style={{ flex: 1, gap:5}}>

                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>PALACIO DEL GOBERNADOR</Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Entypo name="location-pin" size={20} color="black" />
                            <Text style={{fontSize: 10}}>HXRC+RX9, General Luna St, Intramuros, Manila, 1002 Metro Manila</Text>
                    </View>
                   
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Entypo name="warning" size={20} color="red" />
                            <Text>Closed</Text>
                    </View>

                        <View style={{ flexDirection: "row", gap: 5}}>
                            <Fontisto name="ticket" size={20} color="black" />
                            <Text>Entrance is FREE</Text>
                        </View>

                </View>
                </View>
                        
                <View>
                <Text style={{fontWeight:"bold", fontSize: 15,}}>Description</Text>
                    <Text style={{ color: "#6B5E5E", textAlign: "justify"}}>The Palacio del Gobernador (Governor's Palace) is a notable government building located in Intramuros, Manila, Philippines. It stands southwest of Plaza de Roma and was constructed in its current form in 1976.

                        The building houses several important offices, including the Intramuros Administration, the Commission on Elections, and the Home Development Mutual Fund National Capital Region Office.

                        The site was the residence of the Spanish governor-general until an earthquake destroyed the original structure in 1863. The governor-general then moved to Malacañang Palace. The current building's design was altered during its construction in the 1970s to ensure it did not overshadow the nearby Manila Cathedral.</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>   
                    <Text>Learn More</Text>
                    <Entypo name="arrow-bold-right" size={18} color="black" />
                </View>   
                </View>
              
            </BottomSheetView>
        </BottomSheet>
    )
}