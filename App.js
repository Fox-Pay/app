import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_900Black,
  Poppins_300Light,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

import authStorage from "./app/api/storage";
import AppContext from "./app/context/context";

import { appClient as client } from "./app/api/client";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import colors from "./app/config/colors";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_300Light,
    Poppins_400Regular,
  });

  const restoreUser = async () => {
    const user = await authStorage.get("user");
    if (user) {
      client.setHeader("Authorization", `Token ${user.value.token}`);
      return setUser(user.value);
    }

    setUser(null);
  };

  if (!fontsLoaded || !isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={(error) => console.warn(error)}
      />
    );

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StatusBar
          animated
          translucent
          style="light"
          backgroundColor={colors.primary}
        />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}
