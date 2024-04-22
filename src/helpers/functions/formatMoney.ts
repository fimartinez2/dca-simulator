const formatMoney = (value: number, currency?: string) => {
  try {
    return value.toLocaleString("es-CL", {
      style: "currency",
      currency: currency ?? "CLP",
    });
  } catch (error) {
    return value;
  }
};

export default formatMoney;
