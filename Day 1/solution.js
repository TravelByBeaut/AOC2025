const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  howManyZeros(data);
});

const betweenZeroAndNinetyNine = (num) => {
  while (num < 0) num += 100;
  while (num >= 100) num -= 100;
  return num;
};

const howManyZeros = (data) => {
  let num = 50;
  let zeros = 0;
  const dataArray = data.split("\n");
  for (let i = 0; i < dataArray.length; i++) {
    const letter = dataArray[i][0];
    const number = Number(dataArray[i].slice(1));

    if (letter === "L") {
      num -= number;
    }

    if (letter === "R") {
      num += number;
    }

    num = betweenZeroAndNinetyNine(num);

    if (num === 0) {
      zeros++;
    }
  }

  return zeros;
};
