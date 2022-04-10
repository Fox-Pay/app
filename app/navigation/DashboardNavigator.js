import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "./routes";
import DashboardScreen from "../screens/DashboardScreen";
import RedeemCashScreen from "../screens/RedeemCashScreen";

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen component={DashboardScreen} name={routes.DashboardScreen} />
    <Stack.Screen component={RedeemCashScreen} name={routes.RedeemCashScreen} />
  </Stack.Navigator>
);

export default DashboardNavigator;
