export const formatTransactionDate = (dateString: string): string => {
  const transactionDate = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - transactionDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[transactionDate.getDay()];

    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays === 0) {
      return "Today";
    } else {
      return dayName;
    }
  } else {
    return transactionDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  }
};
