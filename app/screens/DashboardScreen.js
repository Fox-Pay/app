import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import fonts from "../config/fonts";
import colors from "../config/colors";
import Text from "../components/Text";
import helpers from "../utils/helpers";
import Screen from "../components/Screen";
import Contact from "../components/Contact";
import Transaction from "../components/Transaction";
import {
  Form,
  FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import apis from "../api/api";
import fsiApis from "../api/fsi";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import routes from "../navigation/routes";
import Success from "../components/Success";
import validators from "../utils/validators";
import BottomSheet from "../components/BottomSheet";

const Dim = Dimensions.get("screen");

const contacts = [
  {
    phone: "+142365088821",
    name: "Fateema Aliyu",
    face: require("../assets/temp/face4.jpg"),
  },
  {
    phone: "+2338140099331",
    name: "Umar Adamu",
    face: require("../assets/temp/face.jpg"),
  },
  {
    phone: "+2347033389645",
    name: "Abdoulrasheed",
    face: require("../assets/temp/face2.jpg"),
  },
  {
    phone: "+2338098394218",
    name: "Jameema James",
    face: require("../assets/temp/face3.jpg"),
  },
  {
    phone: "+1802334323",
    name: "Miracle John",
    face: require("../assets/temp/face5.jpg"),
  },
  {
    phone: "+2349133389645",
    name: "Maryam Ibrahim",
  },
  {
    phone: "+2347053423494",
    name: "Joseph Jonah",
  },
];

const history = [
  {
    amount: 2500,
    claimed: true,
    sender: {
      id: 1,
      first_name: "Abdulrasheed",
      last_name: "Ibrahim",
    },
    receiver: {
      full_name: "Fateema Ibrahim",
      phone_number: "+2347033389645",
    },
  },
  {
    amount: 5000,
    claimed: true,
    sender: {
      id: 1,
      first_name: "Abdulrasheed",
      last_name: "Ibrahim",
    },
    receiver: {
      full_name: "Aliyu Idris",
      phone_number: "+23481230340934",
    },
  },
];

const DashboardScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  const [config, setConfig] = useState();
  const confiApi = useApi(apis.getConfig);
  const [error, setError] = useState(false);
  const transferApi = useApi(fsiApis.transfer);
  const [success, setSuccess] = useState(false);
  const [amountSent, setAmountSent] = useState(0);
  const transactionApi = useApi(apis.createTransaction);
  const [activeContact, setActiveContact] = useState({});
  const [balanceVisible, setBalanceVisible] = useState(false);

  const sheetRef = useRef(null);

  const getCountry = () => {
    if(!activeContact?.phone) return;

    const string = activeContact.phone.slice(0, 4);

    switch(string){
      case "+234":
        return "Nigeria";
      case "+233":
        return "Ghana";
      case "+254":
        return "Kenya";
      default:
        return "USA";
    }
  }

  const handleSend = (item) => {
    setActiveContact(item);
    sheetRef.current?.present();
  };

  const handleSubmit = async (data) => {
    transferApi.setLoading(true);

    // transfer money
    const refNumber = Math.floor(100000 + Math.random() * 10000000);
    // const transferInput = {
    //   Amount: data.amount,
    //   Narration: "Transfer",
    //   DestinationBankCode: "030",
    //   DestinationAccountName: "FoxPay",
    //   SourceAccountNumber: user.account_number,
    //   DestinationAccountNumber: config.account_number,
    //   PaymentReference: refNumber,
    //   OriginatorName: `${user.first_name} ${user.last_name} ${user.other_name}`,
    // };
    // const transferRes = await transferApi.request(transferInput);
    // if (!transferRes.ok) return setError(true);

    // create record of transaction
    const transactionRes = await transactionApi.request({
      name: activeContact.name,
      phone: activeContact.phone,
      amount: data.amount,
      sender: user.user.id,
      hash: refNumber,
    });

    console.log('====================================');
    console.log(transactionRes);
    console.log('====================================');

    setAmountSent(data.amount);
    if (transactionRes.ok) setSuccess(true);
    transferApi.setLoading(false);
  };

  useEffect(() => {
    getConfig();
  }, []);

  const getConfig = async () => {
    confiApi.setLoading(true);
    const res = await confiApi.request();
    if (res.ok) setConfig(res.data[0]);
    confiApi.setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      <LinearGradient colors={[colors.primary, 'transparent']}>
        <View style={styles.top}>
          <View>
            <Text style={styles.title}>
              {balanceVisible ? `N${helpers.formatCurrency(+user?.wallet?.balance || 0)}` : "XXXXXXX"}
            </Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Account Balance</Text>
              {!balanceVisible ? (
                <Ionicons
                  name="eye-off-sharp"
                  size={20}
                  color={colors.white}
                  onPress={() => setBalanceVisible(true)}
                />
              ) : (
                <Ionicons
                  name="eye-sharp"
                  size={20}
                  color={colors.white}
                  onPress={() => setBalanceVisible(false)}
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Logout", "Are you sure you wants to logout?", [
                {
                  text: "Cancel",
                  onPress: () => false,
                  style: "cancel",
                },
                { text: "Logout", onPress: () => logOut() },
              ])
            }
          >
            <Image
              source={require("../assets/temp/face.jpg")}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.icon}>
              <Ionicons name="wallet" size={45} color={colors.primary} />
              <FontAwesome
                size={14}
                style={styles.arrow}
                name="long-arrow-right"
                size={20}
                color={colors.white}
              />
            </View>
            <Text style={styles.text}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <View style={styles.icon}>
              <Ionicons name="wallet" size={45} color={colors.primary} />
            </View>
            <Text style={styles.text}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(routes.RedeemCashScreen)}
          >
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="gift"
                size={45}
                color={colors.primary}
              />
            </View>
            <Text style={styles.text}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <View style={styles.icon}>
              <FontAwesome5
                name="file-invoice-dollar"
                size={40}
                color={colors.primary}
              />
            </View>
            <Text style={styles.text}>History</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.textI}>Your contacts</Text>
          <TouchableOpacity>
            <Text style={[styles.textI, styles.add]}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contactsContainer}
        >
          {contacts.map((item, key) => (
            <Contact
              key={key}
              face={item.face}
              name={item.name}
              phone={item.phone}
              onSend={() => handleSend(item)}
            />
          ))}
        </ScrollView>

        <View style={styles.historyContainer}>
          <View style={styles.historyTop}>
            <Text style={styles.textI}>Transaction History</Text>
            <TouchableOpacity>
              <Text style={[styles.textI, styles.add]}>View All</Text>
            </TouchableOpacity>
          </View>

          <View
            showsVerticalScrollIndicator={false}
            style={styles.contactsContainer}
          >
            {history.map((item, key) => (
              <Transaction
                key={key}
                receiver={item.receiver}
                sender={item.sender}
                claimed={item.claimed}
                amount={item.amount}
              />
            ))}
          </View>
        </View>
      </View>

      <BottomSheet snapPoints={['50%']} title={`Send money to: ${activeContact.name}`} subtitle={`${activeContact.phone}  (${getCountry()})`} ref={sheetRef} >
        <View style={styles.modal}>
          {success ? (
            <Success
              visible={true}
              title={`N${amountSent}`}
              subtitle={`N${amountSent} was successfully sent`}
            />
          ) : (
            <Form
              validationSchema={validators.sendMoneySchema}
              initialValues={helpers.getInitialValuesFromSchema(
                validators.sendMoneySchema
              )}
              onSubmit={handleSubmit}
            >
              <View>
                <FormField
                  name="amount"
                  placeholder="Amount"
                  keyboardType="number-pad"
                  style={styles.customInput}
                />
                <FormField
                  name={"pin"}
                  secureTextEntry
                  style={styles.customInput}
                  keyboardType={"number-pad"}
                  placeholder={"Comfirm Transaction PIN"}
                />
                <View style={styles.error}>
                  <ErrorMessage error="An error occured" visible={error} />
                </View>
                <SubmitButton
                  title={"Send"}
                  style={styles.button}
                  loadingText={"PROCESSING..."}
                  loading={transferApi.loading}
                />
              </View>
            </Form>
          )}
        </View>
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  add: {
    color: colors.primary,
  },
  error: {
    alignItems: "center",
  },
  arrow: {
    left: 10,
    bottom: 15,
    position: "absolute",
  },
  contactsContainer: {
    elevation: 1,
    maxHeight: 220,
    paddingLeft: 15,
    borderRadius: 15,
    paddingVertical: 20,
    width: Dim.width * 0.88,
    backgroundColor: colors.white,
  },
  historyContainer: {
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  button: {
    alignSelf: "center",
    width: Dim.width * 0.9,
  },
  cardsContainer: {
    height: 50,
    marginBottom: 50,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    width: 60,
    height: 55,
    marginBottom: 10,
    borderRadius: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  customInput: {
    backgroundColor: colors.background,
  },
  card: {
    width: 60,
    height: 50,
  },
  top: {
    paddingVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  img: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.white,
  },
  title: {
    fontSize: 30,
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
  },
  subtitle: {
    fontSize: 14,
    marginRight: 15,
    color: "rgba(255, 255, 255, 0.6)",
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  body: {
    flex: 1,
    marginTop: 10,
    paddingTop: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: colors.background,
  },
  bodyTop: {
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
  },
  textI: {
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  historyTop: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    alignItems: "center"
  },
});

export default DashboardScreen;
