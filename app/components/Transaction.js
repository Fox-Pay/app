import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import { FontAwesome5 } from "@expo/vector-icons";

import Text from "./Text";
import helpers from "../utils/helpers";

const Dim = Dimensions.get("screen");

const Transaction = ({ sender, receiver, amount, claimed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name={amount !== 5000 ? "angle-double-up" : "angle-double-down"}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.text}>{receiver.full_name}</Text>
          <Text style={styles.texti}>{receiver.phone_number}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.textii}>N{helpers.formatCurrency(amount)}</Text>
        <Text style={styles.textiii}>{claimed ? "Claimed" : "Sent"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    width: Dim.width * 0.78,
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
  },
  left: {
    flexDirection: "row",
  },
  texti: {
    marginTop: 2,
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
  },
  textii: {
    fontSize: 16,
    color: colors.primary,
  },
  textiii: {
    fontSize: 14,
    color: "rgba(0,0,0,0.3)",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  detail: {
    marginLeft: 10,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default Transaction;
