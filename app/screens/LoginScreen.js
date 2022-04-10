import React, { useState } from "react";
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
import validators from "../utils/validators";
import fonts from "../config/fonts";
import routes from "../navigation/routes";

const Dim = Dimensions.get("screen");

const SignInScreen = ({ navigation }) => {
  const auth = useAuth();
  const loginApi = useApi(authApi.login);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data) => {
    loginApi.setLoading(true);
    const res = await loginApi.request(data);
    console.log("====================================");
    console.log(res);
    console.log("====================================");
    if (!res.ok) return setError(true);
    auth.logIn({ ...res.data });
    loginApi.setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loginApi.loading} title="Signing in...." />
      <Form
        validationSchema={validators.loginSchema}
        initialValues={helpers.getInitialValuesFromSchema(
          validators.loginSchema
        )}
        onSubmit={handleSubmit}
      >
        <Text style={styles.subtitle}>Welcome to</Text>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={[styles.title, commonStyles.spacingTopBottom]}>
          FoxPay
        </Text>
        <View style={styles.errorContainer}>
          <ErrorMessage error="Invalid Username or Password" visible={error} />
        </View>
        <View style={styles.inputsContainer}>
          <FormField name="username" placeholder="Username" />
          <FormField
            name="password"
            secureTextEntry={!showPassword}
            placeholder="Password"
            icon={showPassword ? "eye-outline" : "eye-off-outline"}
            onIconPress={() => setShowPassword(!showPassword)}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={[styles.recoverPassword, commonStyles.spacingTopBottom]}
            >
              Recover password
            </Text>
          </TouchableOpacity>
          <SubmitButton style={styles.button} title="Sign In" />
          <Text
            style={styles.text}
            onPress={() => navigation.navigate(routes.RegisterScreen)}
          >
            Dont have an account? Register
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
  button: {
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.primary,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  recoverPassword: {
    fontSize: 12,
    color: colors.medium,
    alignSelf: "flex-end",
  },
});

export default SignInScreen;
