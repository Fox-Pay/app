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

const updateTransaction = ({ id }) => client.post(`/api/update_transaction/?tx_id=${id}`);

const apis = {
  search,
  getConfig,
  getTransactions,
  updateTransaction,
  createTransaction,
};

export default apis;
