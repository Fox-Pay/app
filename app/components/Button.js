import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import fonts from "../config/fonts";

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
    padding: 14,
    width: "80%",
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
});

export default AppButton;
