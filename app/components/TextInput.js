import React from "react";
import colors from "../config/colors";

import commonStyles from "../config/styles";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";

const Dim = Dimensions.get("screen");

const AppTextInput = ({
  icon,
  style,
  margin = 10,
  onIconPress,
  width = Dim.width * 0.9,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, style, { width, marginVertical: margin }]}>
      <TextInput
        {...otherProps}
        style={[commonStyles.text, styles.input]}
        placeholderTextColor={colors.medium}
      />
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={colors.medium}
          onPress={onIconPress && onIconPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
  icon: {
    marginLeft: 15,
    marginRight: 10,
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 15,
  },
});

export default AppTextInput;
