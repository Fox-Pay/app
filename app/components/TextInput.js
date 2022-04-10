import React from "react";
import colors from "../config/colors";

import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import commonStyles from "../config/styles";

const AppTextInput = ({
  icon,
  style,
  margin = 10,
  onIconPress,
  width = "100%",
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
    borderRadius: 15,
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
