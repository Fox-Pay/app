import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import routes from "./routes";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import WalletScreen from "../screens/WalletScreen";
import DashboardNavigator from "./DashboardNavigator";
import NotificationScreen from "../screens/NotificationScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const options = {
  headerShown: false,
  keyboardHidesTabBar: true,
};

const AppNavigator = ({ color, size }) => (
  <Tab.Navigator screenOptions={options}>
    <Tab.Screen
      options={{
        title: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-sharp" size={size} color={color} />
        ),
      }}
      component={DashboardNavigator}
      name={routes.DashboardNavigator}
    />
    <Tab.Screen
      options={{
        title: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="wallet" size={size} color={color} />
        ),
      }}
      component={WalletScreen}
      name={routes.WalletScreen}
    />
    <Tab.Screen
      options={{
        title: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="notifications-sharp" size={size} color={color} />
        ),
      }}
      component={NotificationScreen}
      name={routes.NotificationsScreen}
    />
    <Tab.Screen
      options={{
        title: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-sharp" size={size} color={color} />
        ),
      }}
      component={ProfileScreen}
      name={routes.ProfileScreen}
    />
  </Tab.Navigator>
);

export default AppNavigator;
