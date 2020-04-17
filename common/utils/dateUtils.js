
export function dateDiffInDays(date1, date2) {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

export function getWeekDay(day) {
  switch (day) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    default: return 'Saturday';
  }
}

function getMonth(month) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return monthNames[month];
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
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return getWeekDay(date.getDay());
    default:
      return `${getMonth(date.getMonth())} ${date.getDate()}`;
  }
}
