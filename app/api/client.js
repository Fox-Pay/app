import { create } from "apisauce";

export const appClient = create({
  baseURL: "http://foxpay.pythonanywhere.com",
});

export const fsiClient = create({
  baseURL: "https://fsi.ng/api",
  headers: {
    "Sandbox-key": "pzUjYsT3lqaZ2oHQDsPCcmY3I8R9z4qg1649322000",
  },
});
