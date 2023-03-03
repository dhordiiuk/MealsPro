import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import {initializeApp} from "firebase/app";

import {
    useFonts as useOswald,
    Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentification/authentication.context";

const firebaseConfig = {
    apiKey: "AIzaSyBJXg_hQTwq8Y2w6zVRmsBrHd7Ez0loNOY",
    authDomain: "mealspro-1a9fc.firebaseapp.com",
    projectId: "mealspro-1a9fc",
    storageBucket: "mealspro-1a9fc.appspot.com",
    messagingSenderId: "271080090182",
    appId: "1:271080090182:web:aab7e7639ef6ca5332b847",
    measurementId: "G-59G209W1S0"
};

const app = initializeApp(firebaseConfig);

export default function App() {
    const [oswaldLoaded] = useOswald({
        Oswald_400Regular,
    });

    const [latoLoaded] = useLato({
        Lato_400Regular,
    });

    if (!oswaldLoaded || !latoLoaded) {
        return null;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthenticationContextProvider>
                    <FavouritesContextProvider>
                        <LocationContextProvider>
                            <RestaurantsContextProvider>
                                <Navigation />
                            </RestaurantsContextProvider>
                        </LocationContextProvider>
                    </FavouritesContextProvider>
                </AuthenticationContextProvider>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </>
    );
}
