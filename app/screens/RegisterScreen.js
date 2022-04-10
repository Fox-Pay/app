import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";
import helpers from "../utils/helpers";
import Screen from "../components/Screen";
import commonStyles from "../config/styles";
import validators from "../utils/validators";
import {
  Form,
  FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import storage from "../api/storage";
import fonts from "../config/fonts";
import routes from "../navigation/routes";
import fsiApis from "../api/fsi";

const Dim = Dimensions.get("screen");

const RegisterScreen = ({ navigation }) => {
  const auth = useAuth();
  const [step, setStep] = useState("");
  const [error, setError] = useState(false);
  const registerApi = useApi(authApi.register);
  const bvnDetailApi = useApi(fsiApis.getBVNDetail);
  const bankAccountApi = useApi(fsiApis.createBankAccount);

  const handleSubmit = async (data) => {
    // get bvn detail
    setStep("Validating BVN...");
    registerApi.setLoading(true);
    const bvnRes = await bvnDetailApi.request(data.bvn);
    if (!bvnRes.ok) return setError(true);

    //create bank account
    setStep("Generating wallet...");
    const bankdata = {
      ...bvnRes.data,
      Email: "usert@dummydata.com",
      Salutation: "MR.",
      FirstName: "Mia",
      MiddleName: "Afit",
      LastName: "Okai",
      Gender: "M",
      Address: "Yola, Nigeria",
      MaritalStatus: " ",
      BVN: data.bvn,
      APPID: "FoxPay",
    };
    const bankRes = await bankAccountApi.request(bankdata);

    //create user account
    setStep("Finalizing...");
    const res = await registerApi.request({
      ...data,
      ...bankRes.data,
      ...bvnRes.data,
      bvn: data.bvn,
    });
    console.log("====================================");
    console.log(res);
    console.log("====================================");

    if (!res.ok) return setError(true);
    auth.logIn(res.data);
    registerApi.setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={registerApi.loading} title={step} />
      <Form
        validationSchema={validators.registerSchema}
        initialValues={helpers.getInitialValuesFromSchema(
          validators.registerSchema
        )}
        onSubmit={handleSubmit}
      >
        <Text style={styles.subtitle}>Register</Text>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={[styles.title, commonStyles.spacingTopBottom]}>
          FoxPay
        </Text>
        <View style={styles.errorContainer}>
          <ErrorMessage error="An error occured" visible={error} />
        </View>
        <View style={styles.inputsContainer}>
          <FormField
            margin={2}
            name="bvn"
            maxLength={11}
            placeholder="BVN"
            keyboardType="number-pad"
          />
          <FormField name="username" placeholder="Username" margin={2} />
          <FormField
            margin={2}
            secureTextEntry
            name="password"
            placeholder="Password"
          />
          <FormField
            margin={2}
            secureTextEntry
            name="cpassword"
            placeholder="Confirm password"
          />
          <SubmitButton style={styles.button} title="REGISTER" />
          <Text
            style={styles.text}
            onPress={() => navigation.navigate(routes.LoginScreen)}
          >
            Already have an account? Login
          </Text>
        </View>
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputsContainer: {
    width: Dim.width * 0.9,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
    fontFamily: fonts.PoppinsRegular,
  },
  subtitle: {
    fontSize: 18,
    color: colors.primary,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
  },
});

export default RegisterScreen;
