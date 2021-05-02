const getWeekdayName = (date: Date) => {
  const weekdayNames = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  return weekdayNames[date.getDay()];
};

const getDayAndMonth = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
};

export { getWeekdayName, getDayAndMonth };
