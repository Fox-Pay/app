import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

const registerSchema = Yup.object().shape({
  bvn: Yup.string().required().label("BVN"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
  cpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const contactSchema = Yup.object().shape({
  full_name: Yup.string().required().label("Phone number"),
  phone_number: Yup.string().required().label("Phone number"),
});

const sendMoneySchema = Yup.object().shape({
  amount: Yup.number().required().label("Amount"),
  pin: Yup.number().required().label("PIN"),
});

const validators = {
  loginSchema,
  contactSchema,
  registerSchema,
  sendMoneySchema,
};

export default validators;
