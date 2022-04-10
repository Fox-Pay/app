import React from "react";
import { Text } from "react-native";
import commonStyles from "../config/styles";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[commonStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
