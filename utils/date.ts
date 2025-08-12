/**
 * This function formats a given date into a human-readable string.
 * It uses the 'en-US' locale and formats the date to include the weekday, month, and day.
 * @param date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * This function checks if two dates are the same day, ignoring time. 
 * It compares the year, month, and day of both dates.
 * @param date1 - The first date to compare.
 * @param date2 - The second date to compare.
 * @returns {boolean} - Returns true if both dates are the same day, false otherwise
 * */
export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
