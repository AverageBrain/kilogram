export const getCorrectMemberCase = (count?: number) => {
  if (!count) {
    return '';
  }
  if (count % 10 === 1 && count !== 11) {
    return 'участник';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return 'участника';
  } else {
    return 'участников';
  }
};
