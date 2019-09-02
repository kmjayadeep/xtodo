
export function dateDiffInDays(date1, date2) {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

// Convert date object to readable day like Today, Yesterday etc
export function dateToReadableDay(date) {
  const dateDiff = dateDiffInDays(new Date(), date);
  switch (dateDiff) {
    case 1:
      return 'Tomorrow';
    case 0:
      return 'Today';
    case -1:
      return 'Yesterday';
    default:
      return date.toDateString();
  }
}
