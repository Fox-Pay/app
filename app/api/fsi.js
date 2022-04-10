import { fsiClient as client } from "./client";

const getBVNDetail = (bvn) => {
  return client.get(`/heritagebank/identity/BVNValidation?bvn=${bvn}`);
};

const createBankAccount = (data) => {
  return client.post("/heritagebank/accounts/AccountOpening/WithBVN", data);
};

const transfer = (data) => {
  return client.post("/heritagebank/transfers/FundsTransfer/Inter", data);
};

const sendOTP = (data) => {
  const input = {
    length: 6,
    customer: {
      name: data.name,
      // email: "kazan@mailinator.com",
      phone: data.phone,
    },
    expiry: 5,
    send: true,
    sender: "FoxPay",
    medium: ["sms", "whatsapp"],
  };
  return client.post("/v1/flutterwave/v3/otps", input, {
    headers: {
      Authorization: "Bearer pzUjYsT3lqaZ2oHQDsPCcmY3I8R9z4qg1649322000",
    },
  });
};

const getBanks = () => {
  return client.get(
    "/v1/flutterwave/v3/banks/NG?country=NG",
    {},
    {
      headers: {
        Authorization: "Bearer pzUjYsT3lqaZ2oHQDsPCcmY3I8R9z4qg1649322000",
      },
    }
  );
};

const fsiApis = {
  sendOTP,
  transfer,
  getBanks,
  getBVNDetail,
  createBankAccount,
};

export default fsiApis;
