/* eslint-disable */
import { Stack, Link, useNavigation, Tabs } from 'expo-router';
import { StatusBar, Text } from 'react-native';
import Map from '~/components/Map';
import LandmarkProvider from '~/provider/LandmarkProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SelectedLandmarkSheet from '~/components/selectedLandmarkSheet';
export default function Home() {

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs />
        <LandmarkProvider>
          <Map />
          <SelectedLandmarkSheet />

        </LandmarkProvider>

      </GestureHandlerRootView>
    </>
  );
}
