import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {Button, Text} from "react-native";

import {SafeArea} from "../../components/utility/safe-area.component";

import {AuthenticationContext} from "../../services/authentification/authentication.context";
import {RestaurantsNavigator} from "./restaurants.navigator";
import {MapScreen} from "../../features/map/screens/map.screen";

import {RestaurantsContextProvider} from "../../services/restaurants/restaurants.context";
import {LocationContextProvider} from "../../services/location/location.context";
import {FavouritesContextProvider} from "../../services/favourites/favourites.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
};

const Settings = () => {
    const {onLogout} = useContext(AuthenticationContext);
    return (
        <SafeArea>
            <Text>Settings</Text>
            <Button title="logout" onPress={() => onLogout()}/>
        </SafeArea>
    );
};

const createScreenOptions = ({route}) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({size, color}) => (
            <Ionicons name={iconName} size={size} color={color}/>
        ),
    };
};

export const AppNavigator = () => (
    <FavouritesContextProvider>
        <LocationContextProvider>
            <RestaurantsContextProvider>
                <Tab.Navigator
                    screenOptions={createScreenOptions}
                    tabBarOptions={{
                        activeTintColor: "tomato",
                        inactiveTintColor: "gray",
                    }}
                >
                    <Tab.Screen name="Restaurants" component={RestaurantsNavigator}/>
                    <Tab.Screen name="Map" component={MapScreen}/>
                    <Tab.Screen name="Settings" component={Settings}/>
                </Tab.Navigator>
            </RestaurantsContextProvider>
        </LocationContextProvider>
    </FavouritesContextProvider>
);
