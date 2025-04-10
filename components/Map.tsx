/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Mapbox, { Camera, LocationPuck, MapView, UserLocation, PointAnnotation, ShapeSource, SymbolLayer, Images, CircleLayer, LineLayer } from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import { useLandmark } from '~/provider/LandmarkProvider';
import LineRoute from './LineRoute';
import LandmarkMarkers from './LandmarkMarkers';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {
    const { directionCoordinates, routeTime, routeDistance } = useLandmark();
    console.log("Route Time: ", routeTime, "Distance:", routeDistance);
    const [coords, setCoords] = useState<[number, number]>([0, 0]);
    const getPermissionLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const userCoords: [number, number] = [position.coords.longitude, position.coords.latitude];
                setCoords(userCoords);
                console.log("User's Location: ", position.coords);
            },
            (error) => {
                console.log("Location Error: ", error);
            },
            { enableHighAccuracy: true }
        );
    };
    useEffect(() => {
        getPermissionLocation();
        return () => {

        };
    }, []);



    return (
        <View style={styles.container}>
            <MapView style={styles.map} styleURL="mapbox://styles/mapbox/dark-v11">                
                <Camera zoomLevel={15} centerCoordinate={coords} /> 
                <LocationPuck puckBearingEnabled={true} puckBearing="heading" pulsing={{ isEnabled: true }} />
               
                <LandmarkMarkers />
                
                {directionCoordinates && (
                    <LineRoute coordinates={directionCoordinates}/>)}

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    puck: {
        width: 50,
        height: 50
    }
});