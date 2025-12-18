const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  howManyInvalidIds(data);
});

const howManyInvalidIds = (data) => {
  const idRange = data.split(",");
  let invalidIds = 0;
  for (let i = 0; i < idRange.length; i++) {
    const range = idRange[i].split("-");
    const number1 = Number(range[0]);
    const number2 = Number(range[1]);

    for (let i = number1; i <= number2; i++) {
      const length = i.toString().length;
      if (length % 2 === 0) {
        const partOne = i.toString().slice(0, length / 2);
        const partTwo = i.toString().slice(length / 2, length);

        if (partOne === partTwo) {
          invalidIds += i;
        }
      }
    }
  }

  return invalidIds;
};

const howManyInvalidIds2 = (data) => {
  const idRange = data.split(",");
  let invalidIds = 0;
  for (let i = 0; i < idRange.length; i++) {
    const range = idRange[i].split("-");
    const number1 = Number(range[0]);
    const number2 = Number(range[1]);

    for (let j = number1; j <= number2; j++) {
      if (j.toString().match(/^(\d+)\1+$/)) {
        invalidIds += j;
      }
    }
  }

  return invalidIds;
};
