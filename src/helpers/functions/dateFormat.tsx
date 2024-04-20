const dateFormat = (date: Date): string => {
  // format as UTC dd/mm/yyyy adding 0s if necessary
  const formattedDate = date.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export default dateFormat;
