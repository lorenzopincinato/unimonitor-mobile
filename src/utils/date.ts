const weekdayNames = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const getWeekdayName = (date: Date) => {
  return weekdayNames[date.getDay()];
};

const getDayAndMonth = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
};

const getDayMonthAndYear = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
};

const getMinutesAndHours = (date: Date) => {
  return `${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const getLastMonday = (date: Date) => {
  const lastMonday = new Date(date);
  lastMonday.setDate(lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7));

  return lastMonday;
};

const getNextSaturday = (date: Date) => {
  const nextSaturday = new Date(date);
  nextSaturday.setDate(
    nextSaturday.getDate() + ((13 - nextSaturday.getDay()) % 7),
  );

  return nextSaturday;
};

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);

  return newDate;
};

const getIsoDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export {
  weekdayNames,
  getWeekdayName,
  getDayAndMonth,
  getDayMonthAndYear,
  getMinutesAndHours,
  getLastMonday,
  getNextSaturday,
  addDays,
  getIsoDate,
};
