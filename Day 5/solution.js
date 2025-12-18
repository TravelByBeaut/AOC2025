const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  freshProduce(data);
});

const freshProduce = (data) => {
  const arrays = data.split("\n\n").map((section) => section.split("\n"));
  const rangesArray = arrays[0];
  const produce = arrays[1];
  const ranges = rangesArray.map((section) => section.split("-"));
  let freshProduceCount = 0;
  const numbersChecked = [];

  for (let i = 0; i < produce.length; i++) {
    for (const array of ranges) {
      if (
        Number(produce[i]) >= Number(array[0]) &&
        Number(produce[i]) <= Number(array[1]) &&
        !numbersChecked.includes(produce[i])
      ) {
        numbersChecked.push(produce[i]);
        freshProduce++;
      }
    }
  }

  return freshProduceCount;
};

const freshProduce2 = (data) => {
  const arrays = data.split("\n\n").map((section) => section.split("\n"));
  const rangesArray = arrays[0];

  const ranges = rangesArray.map((line) => line.split("-").map(BigInt));

  ranges.sort((a, b) => Number(a[0]) - Number(b[0]));

  let ids = 0n;
  let [currentStart, currentEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [newStart, newEnd] = ranges[i];

    if (newStart <= currentEnd + 1n) {
      if (newEnd > currentEnd) {
        currentEnd = newEnd;
      }
    } else {
      ids += currentEnd - currentStart + 1n;
      currentStart = newStart;
      currentEnd = newEnd;
    }
  }

  ids += currentEnd - currentStart + 1n;

  return Number(ids);
};
