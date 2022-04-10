import { appClient as client } from "./client";

const search = (phone) => client.get(`/api/search/?receiver=${phone}`);

const getTransactions = () => client.get("/api/transactions/");

const getConfig = () => client.get("/api/config/");

const createTransaction = (data) => {
  const formdata = new FormData();
  for (const key of Object.keys(data)) {
    formdata.append(key, data[key]);
  }

  return client.post("/api/transactions/", formdata);
};

const apis = {
  search,
  getConfig,
  getTransactions,
  createTransaction,
};

export default apis;
