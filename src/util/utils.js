export function renderReadableDate(date) {
  if (!date) return;
  const dateCopy = structuredClone(date);
  // Manually adjust for the desired time zone (e.g., CET)
  const localOffset = dateCopy.getTimezoneOffset(); // Get the local timezone offset in minutes
  dateCopy.setMinutes(dateCopy.getMinutes() - localOffset); // Adjust the date to local time

  return dateCopy.toISOString().split("T")[0];
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function getDatesInRange(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function sumArrayNumbers(array) {
  return array.reduce((a, b) => a + b, 0)
}

export const customModalStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "365px",
    boxShadow: "1px 1px 3px rgb(224, 224, 224)",
  },
};
