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

import Text from "./Text";

const Dim = Dimensions.get("screen");

const Contact = ({ phone, name, face, onSend, onRequest }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={face || require("../assets/user.png")}
          style={styles.contactPic}
        />
        <View style={styles.detail}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.texti}>{phone}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onSend}>
          <Text style={styles.textii}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRequest}>
          <Text style={styles.textiii}>Request</Text>
        </TouchableOpacity>
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
  contactPic: {
    width: 40,
    height: 40,
    borderRadius: 5,
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

export default Contact;
