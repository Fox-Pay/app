import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Modal,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
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
import validators from "../utils/validators";
import Success from "../components/Success";
import routes from "../navigation/routes";

const Dim = Dimensions.get("screen");

const contacts = [
  {
    phone: "08165088821",
    name: "Fateema Aliyu",
    face: require("../assets/temp/face4.jpg"),
  },
  {
    phone: "08140099331",
    name: "Umar Adamu",
    face: require("../assets/temp/face.jpg"),
  },
  {
    phone: "07033389645",
    name: "Abdoulrasheed",
    face: require("../assets/temp/face2.jpg"),
  },
  {
    phone: "08098394218",
    name: "Jameema James",
    face: require("../assets/temp/face3.jpg"),
  },
  {
    phone: "08023234323",
    name: "Miracle John",
    face: require("../assets/temp/face5.jpg"),
  },
  {
    phone: "07033389645",
    name: "Maryam Ibrahim",
  },
  {
    phone: "07033389645",
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
      phone_number: "07033389645",
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
      full_name: "Fateema Ibrahim",
      phone_number: "07033389645",
    },
  },
];

const DashboardScreen = ({ navigation }) => {
  const {
    user: { user },
    logOut,
  } = useAuth();
  const [config, setConfig] = useState();
  const confiApi = useApi(apis.getConfig);
  const [error, setError] = useState(false);
  const transferApi = useApi(fsiApis.transfer);
  const [success, setSuccess] = useState(false);
  const [activeContact, setActiveContact] = useState();
  const transactionApi = useApi(apis.createTransaction);
  const [modalVisible, setModalVisible] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);

  const handleSend = (item) => {
    setActiveContact(item);
    setModalVisible(true);
  };

  const handleSubmit = async (data) => {
    transferApi.setLoading(true);

    // transfer money
    const refNumber = Math.floor(100000 + Math.random() * 10000000);
    const transferInput = {
      Amount: data.amount,
      Narration: "Transfer",
      DestinationBankCode: "030",
      DestinationAccountName: "FoxPay",
      SourceAccountNumber: user.account_number,
      DestinationAccountNumber: config.account_number,
      PaymentReference: refNumber,
      OriginatorName: `${user.first_name} ${user.last_name} ${user.other_name}`,
    };
    const transferRes = await transferApi.request(transferInput);
    if (!transferRes.ok) return setError(true);

    // create record of transaction
    const transactionRes = await transactionApi.request({
      name: activeContact.name,
      phone: activeContact.phone,
      amount: data.amount,
      sender: user.id,
      hash: refNumber,
    });

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
      <ImageBackground
        style={styles.imgbg}
        source={require("../assets/topbg.png")}
      >
        <View style={styles.top}>
          <View>
            <Text style={styles.title}>
              {balanceVisible ? `N${helpers.formatCurrency(21438)}` : "XXXXXXX"}
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
            <Text style={styles.text}>Redeem</Text>
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
      </ImageBackground>
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

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Share money with:</Text>
                <Text style={styles.modalSubtitle}>{activeContact?.name}:</Text>
                <Text style={styles.modalSubtitleI}>
                  {activeContact?.phone}:
                </Text>
              </View>
              <Ionicons
                name="close-circle"
                size={34}
                color={colors.danger}
                onPress={() => {
                  setActiveContact(null);
                  setModalVisible(false);
                }}
              />
            </View>
            <View>
              {success ? (
                <Success
                  visible={true}
                  title="N5,000"
                  subtitle={`was successfully sent`}
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
                      keyboardType="number-pad"
                      placeholder="Enter Amount"
                      style={styles.customInput}
                    />
                    <FormField
                      name={"pin"}
                      secureTextEntry
                      placeholder={"Enter PIN"}
                      keyboardType={"number-pad"}
                      style={styles.customInput}
                    />
                    <View style={styles.error}>
                      <ErrorMessage error="An error occured" visible={error} />
                    </View>
                    <SubmitButton
                      style={styles.button}
                      title={"PROCEED TO SEND"}
                      loadingText={"PROCESSING..."}
                      loading={transferApi.loading}
                    />
                  </View>
                </Form>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
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
  imgbg: {},
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
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18,57,98,0.8)",
  },
  modal: {
    padding: 10,
    borderRadius: 10,
    width: Dim.width * 0.9,
    height: Dim.height * 0.4,
    backgroundColor: colors.white,
  },
  modalHeader: {
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 16,
    color: "rgba(0,0,0,0.8)",
    fontFamily: fonts.PoppinsRegular,
  },
  modalSubtitle: {
    fontSize: 14,
  },
  modalSubtitleI: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
  },
});

export default DashboardScreen;
