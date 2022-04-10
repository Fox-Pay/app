import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import routes from "./routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={routes.RegisterScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
