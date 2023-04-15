export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatCryptoCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "DAI",
    minimumFractionDigits: 1,
  }).format(value);
};
