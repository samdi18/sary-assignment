import { format } from 'date-fns';
import dayjs from 'dayjs';

export const formattedDate = (dateStr) => {
  const [day, month, year] = dateStr.split('-');

  // console.log(day);
  // console.log(month);
  // console.log(year);

  const date = new Date(+year, month - 1, +day);
  let formatString = 'MMMM D, YYYY';
  return dayjs(date).format(formatString);
};

export const formattedNumber = (number) => {
  let removed = number.toString().split('').splice(0, 3);
  let remaining = number.toString().split('').splice(3);
  const transform = `(${removed.join('')}) ${remaining.join('')}`;
  return transform;
};
