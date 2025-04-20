/* eslint-disable */

import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import ARScreen from '~/app/AR_Cam';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const TabBar = ({ state, descriptors, navigation }) => {
    const icons = {
        index: (props) => <Entypo name="map" size={24} color={inactiveColor} {...props} />,
        search: (props) => <FontAwesome name="search" size={24} color={inactiveColor}{...props} />,
        AR_Cam: (props) => <MaterialCommunityIcons name="cube-scan" size={24} color={inactiveColor} {...props} />,
        notification: (props) => <Ionicons name="notifications" size={24} color={inactiveColor} {...props} />,
        profile: (props) => <Ionicons name="person" size={24} color={inactiveColor} {...props} />,
    }


    const primaryColor = '#637ab7'
    const inactiveColor = '#737373'
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                console.log("name:", route.name)
                if (['_sitemap', '+not-found'].includes(route.name)) return null
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabBarItem}
                        accessibilityRole='button'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}

                    >{
                            icons[route.name]({
                                color: isFocused ? primaryColor : inactiveColor
                            })
                        }
                        <Text style={{ color: isFocused ? primaryColor : inactiveColor, fontSize: 11 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        top: 40,
        flexDirection: "row",
        backgroundColor: "#ffffff",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",

    },

    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    }
})
export default TabBar
