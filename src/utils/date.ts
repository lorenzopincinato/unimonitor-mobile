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

export {
  weekdayNames,
  getWeekdayName,
  getDayAndMonth,
  getDayMonthAndYear,
  getMinutesAndHours,
};
