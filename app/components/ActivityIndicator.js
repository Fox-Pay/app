import React, { useEffect } from "react";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import Text from "../components/Text";
import colors from "../config/colors";
import fonts from "../config/fonts";

const Dim = Dimensions.get("screen");

const ActivityIndicator = ({
  title = "Loading...",
  subtitle = "Please wait",
  visible,
}) => {
  if (!visible) return <></>;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <LottieView
        loop
        autoPlay
        speed={1.5}
        style={styles.indicator}
        source={require("../assets/animations/loader.json")}
      />
      <Text style={styles.textII}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: Dim.width,
    height: Dim.height,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  indicator: {
    height: Dim.height * 0.4,
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: colors.primary,
    fontFamily: fonts.RobotoBlack,
  },
  textII: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: fonts.RobotoBold,
  },
});

export default ActivityIndicator;
