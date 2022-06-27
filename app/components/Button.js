import React from "react";
import { ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import fonts from "../config/fonts";

const Dim = Dimensions.get("screen");

function AppButton({
  title,
  style,
  onPress,
  disabled,
  loadingText,
  loading = false,
  color = "primary",
}) {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[
        styles.button,
        style,
        loading
          ? { backgroundColor: colors["disabled"] }
          : { backgroundColor: colors[color] },
      ]}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator
          animating={true}
          style={{ marginRight: 10 }}
          color={colors.white}
        />
      )}
      <Text style={[styles.text, { fontSize: style?.fontSize || 14 }]}>
        {loading && loadingText ? loadingText : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: Dim.width * 0.95,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    letterSpacing: 1.1,
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
  },
});

export default AppButton;
