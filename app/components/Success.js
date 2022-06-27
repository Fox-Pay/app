import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";

import fonts from "../config/fonts";
import Text from "../components/Text";
import colors from "../config/colors";

const Dim = Dimensions.get("screen");

const Success = ({ title, subtitle, visible }) => {
  if (!visible) return <></>;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <LottieView
        autoPlay
        speed={1}
        loop={false}
        style={styles.indicator}
        source={require("../assets/animations/success.json")}
      />
      <Text style={styles.textII}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    height: Dim.height * 0.15,
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    alignSelf: "center",
    color: colors.primary,
    fontFamily: fonts.PoppinsRegular,
  },
  textII: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: fonts.PoppinsRegular,
  },
});

export default Success;
