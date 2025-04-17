/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Mapbox, { Camera, LocationPuck, MapView, Images, VectorSource } from '@rnmapbox/maps';
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
            <MapView style={styles.map} styleURL="mapbox://styles/mapbox/dark-v11" rotateEnabled scrollEnabled>
                <Camera zoomLevel={15} centerCoordinate={[120.97542723276051, 14.591293316236834]} pitch={60} maxBounds={{
                    ne: [120.98057084428427, 14.599918973377212],
                    sw: [120.96574001513486, 14.576564367241561],

                }} />

                <LocationPuck puckBearingEnabled={true} puckBearing="heading" pulsing={{ isEnabled: true }} androidRenderMode="gps"
                />

                <LandmarkMarkers />

                {directionCoordinates && (
                    <LineRoute coordinates={directionCoordinates} />)}

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