import { Stack, Link, useNavigation } from 'expo-router';
import { StatusBar } from 'react-native';
import Map from '~/components/Map';
import LandmarkProvider from '~/provider/LandmarkProvider';


export default function Home() {

  return (
    <>


      <LandmarkProvider>
      <Stack.Screen options={{ title: 'Navigation', headerShown: false }} />
      <Map />
      </LandmarkProvider>


    </>
  );
}
