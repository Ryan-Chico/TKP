/* eslint-disable */
import { Stack, Tabs } from 'expo-router';
import TabBar from '../components/Tabs';


export default function Layout() {
  return (
      <Tabs
      screenOptions={
        {
          headerShown: false
        }
      }
      tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen
        name="index"
        options={{
          title: "Map"
        }}
        />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search"
        }}
      />
      <Tabs.Screen
        name="AR_Cam"
        options={{
          title: "AR Cam"
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile"
        }}
      />
      </Tabs>

  );
}
