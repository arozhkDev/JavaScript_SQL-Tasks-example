Date.prototype.daysTo = function (otherDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const date1Milliseconds = this.getTime();
  const date2Milliseconds = otherDate.getTime();

  const timeDiff = Math.abs(date2Milliseconds - date1Milliseconds);

  const daysDifference = Math.floor(timeDiff / oneDay);

  return daysDifference;
};

const d1 = new Date('2024-04-19');
const d2 = new Date('2024-04-20');

console.log('Number of days between', d1, 'and', d2, 'is:', d1.daysTo(d2));
