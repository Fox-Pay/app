const getInitialValuesFromSchema = (schema) =>
  Object.keys(schema.fields).reduce(
    (object, key) => ({ ...object, [key]: "" }),
    {}
  );

const formatCurrency = (num) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const truncate = (text, len, type) => {
  if (text.length > len) {
    const trunc = text.slice(0, len);
    return `${trunc}....${type}`;
  }

  return text;
};

export default {
  delay,
  truncate,
  formatCurrency,
  getInitialValuesFromSchema,
};
