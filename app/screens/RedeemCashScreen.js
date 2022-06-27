import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';


import fonts from "../config/fonts";
import Text from "../components/Text";
import colors from "../config/colors";
import helpers from "../utils/helpers";
import Screen from "../components/Screen";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import dayjs from "dayjs";
import useApi from "../hooks/useApi";
import apis from "../api/api";
import fsiApis from "../api/fsi";
import Success from "../components/Success";

const Dim = Dimensions.get("screen");

const RedeemCashScreen = ({ navigation }) => {
  const [otp, setOtp] = useState();
  const searchApi = useApi(apis.search);
  const [phone, setPhone] = useState("");
  const sendOTPApi = useApi(fsiApis.sendOTP);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const updateTransactionApi = useApi(apis.updateTransaction);
  const [activeTransaction, setActiveTransaction] = useState({});

  const handleSearch = async () => {
    if (!phone || phone.length < 11) return;

    setSearching(true);
    const res = await searchApi.request(phone);

    if (res.ok) setTransactions(res.data);
    setSearching(false);
  };

  const handleClaim = async (transaction) => {
    setLoading(true);
    const res = await sendOTPApi.request({
      // change sender to receiver in production
      phone: transaction.sender.phone,
      name: `${transaction.sender.first_name} ${transaction.sender.last_name} ${transaction.sender.other_name}`,
    });
    if (res.ok) setOtp(res.data.data[0]);
    const appres = await updateTransactionApi.request({ id: transaction.id });
    console.log(appres);
    setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={['rgba(0,0,0,0.8)', 'transparent']}
      >
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-sharp" size={15} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Redeem Cash</Text>
      </LinearGradient>
      <View style={styles.body}>
        <TextInput
          maxLength={15}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          editable={loading || !Boolean(otp?.otp)}
          onChangeText={(text) => setPhone(text)}
        />
        <Button
          title={"Search"}
          loading={searching}
          onPress={handleSearch}
          loadingText="Searching..."
          disabled={Boolean(otp?.otp)}
          style={styles.searchButton}
        />

        {otp?.otp ? (
          success ? (
            <Success
              visible={true}
              title="Payment"
              subtitle={`successfully claimed`}
            />
          ) : (
            <View style={styles.otpContainer}>
              <Text style={styles.textII}>
                Enter a code sent to a number ending in{" "}
                <Text style={styles.textIII}>
                  {activeTransaction.sender.phone.slice(-4)}
                </Text>
              </Text>
              <TextInput
                maxLength={6}
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
              />
              <TextInput
                maxLength={6}
                secureTextEntry
                style={styles.input}
                placeholder="Access PIN"
                keyboardType="number-pad"
              />
              <Button
                style={styles.button}
                title="Proceed"
                onPress={() => setSuccess(true)}
              />
            </View>
          )
        ) : (
          transactions.map((transaction, key) => (
            <View style={styles.card} key={key}>
              <Text style={styles.text}>
                Amount:{" "}
                <Text style={styles.textI}>
                  N{helpers.formatCurrency(transaction.amount)}
                </Text>
              </Text>
              <Text style={styles.text}>
                From:{" "}
                <Text style={styles.textI}>
                  {`${transaction.sender.first_name} ${transaction.sender.last_name} ${transaction.sender.other_name}`}
                </Text>
              </Text>
              <Text style={styles.text}>
                Date:{" "}
                <Text style={styles.textI}>
                  {dayjs(transaction.timestamp).format("dddd, MMMM DD, YYYY")}
                </Text>
              </Text>
              <Button
                title="Claim"
                loading={loading}
                style={styles.button}
                loadingText="Processing..."
                onPress={() => {
                  setActiveTransaction(transaction);
                  handleClaim(transaction);
                }}
              />
            </View>
          ))
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bg: {
    marginTop: -15,
  },
  body: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: colors.white,
  },
  container: {
    backgroundColor: "#F8F1F1",
  },
  card: {
    elevation: 1,
    marginTop: 10,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  header: {
    height: 120,
    alignItems: "center",
    paddingHorizontal: 25,
    flexDirection: "row",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    backgroundColor: colors.primary,
  },
  searchButton: {
    height: 30,
    padding: 5,
    width: 100,
    fontSize: 12,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginRight: 30,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "rgba(0,0,0,0.8)",
    fontFamily: fonts.PoppinsRegular,
  },
  textI: {
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
    fontFamily: fonts.PoppinsRegular,
  },
  textII: {
    fontSize: 14,
  },
  textIII: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#545CE5",
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: Dim.width * 0.8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  otpContainer: {
    elevation: 1,
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});

export default RedeemCashScreen;
