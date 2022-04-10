import { Platform, StyleSheet } from "react-native";
import colors from "./colors";
import fonts from "./fonts";

export default StyleSheet.create({
  title: {
    fontSize: 24,
    color: colors.white,
    fontFamily: fonts.PoppinsBlack,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  text: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.Poppins_300Light,
  },
  spacingTop: {
    marginTop: 10,
  },
  spacingBottom: {
    marginBottom: 10,
  },
  spacingTopBottom: {
    marginVertical: 10,
  },
});
