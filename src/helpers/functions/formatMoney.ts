const formatMoney = (value: number, currency?: string) => {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: currency ?? "CLP",
  });
};

export default formatMoney;
