/* eslint-disable */
import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import pin from '../assets/pinB.png';
import landmarks from '../data/landmark.json';
import { featureCollection, point } from '@turf/helpers';

import { useLandmark } from '~/provider/LandmarkProvider';
export default function LandmarkMarkers(){
    const { setSelectedLandmark} = useLandmark();
    const points = landmarks.map((landmark) => point([landmark.longitude, landmark.latitude], { landmark }));
    const onPointPress = async (event: OnPressEvent) => {
        if (event.features[0].properties?.landmark) {
            setSelectedLandmark(event.features[0].properties.landmark);
        }


    };
    return(
        <ShapeSource id="landmarks" cluster shape={featureCollection(points)}
            onPress={onPointPress}>

            <SymbolLayer id="cluster-count"
                style={{
                    textField: ['get', 'point_count'],
                    textSize: 18,
                    textPitchAlignment: 'map',
                }} />

            <CircleLayer
                id='cluster'
                filter={['has', 'point_count']}
                style={{
                    circleRadius: 15,
                    circleColor: '#6366F1',
                    circlePitchAlignment: 'map',
                    circleOpacity: 0.7,
                    circleStrokeWidth: 2,
                    circleStrokeColor: 'white',
                }}
            />

            <SymbolLayer id="landmark-icons"
                filter={['!', ['has', 'point_count']]}
                style={{
                    iconImage: 'pin',
                    iconSize: 0.7,
                    iconAllowOverlap: true,
                    iconAnchor: 'bottom',
                }} />

            <Images images={{ pin }} />

        </ShapeSource>
    )
}