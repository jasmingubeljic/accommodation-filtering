export function renderReadableDate(date) {
  const dateCopy = structuredClone(date);
  // Manually adjust for the desired time zone (e.g., CET)
  const localOffset = dateCopy.getTimezoneOffset(); // Get the local timezone offset in minutes
  dateCopy.setMinutes(dateCopy.getMinutes() - localOffset); // Adjust the date to local time

  return dateCopy.toISOString().split("T")[0];
}
