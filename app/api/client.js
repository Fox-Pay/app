import { create } from "apisauce";

export const appClient = create({
  baseURL: "https://foxxpay.herokuapp.com",
});

export const fsiClient = create({
  baseURL: "https://fsi.ng/api",
  headers: {
    "Sandbox-key": "pzUjYsT3lqaZ2oHQDsPCcmY3I8R9z4qg1649322000",
  },
});
