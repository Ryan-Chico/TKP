/* eslint-disable */
import React from 'react';
import { ViroARScene, ViroARSceneNavigator, ViroAmbientLight, Viro3DObject } from '@viro-community/react-viro';
import { View, Text} from 'react-native';

const AR_Cam = () => {


    return (
        <ViroARScene>
            <ViroAmbientLight color="#ffffff" />
            <Viro3DObject
                source={require('../assets/font_occlusion.jpeg')}

                scale={[0.008, 0.008, 0.008]}
                rotation={[-170, 0, 0]}
                type="OBJ"
            />

        </ViroARScene>
       
    )
}

export default AR_Cam