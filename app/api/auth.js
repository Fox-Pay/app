import { appClient as client } from "./client";
import storage from "./storage";

const login = async (data) => {
  const res = await client.post("/auth/login/", data);
  if (res.ok) {
    client.setHeader("Authorization", `Token ${res.data.token}`);
  }

  return res;
};

const register = async (data) => {
  const formdata = new FormData();
  for (const key of Object.keys(data)) {
    formdata.append(key, data[key]);
  }

  const res = await client.post("/auth/register/", formdata);

  if (res.ok) {
    storage.set("user", res.data);
    client.setHeader("Authorization", `Token ${res.data.token}`);
  }

  return res;
};

export default {
  login,
  register,
};
