import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  text: {
    color: colors.primary,
  },
});

export default NotificationScreen;
