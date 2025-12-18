const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  highestVoltage(data);
});

const highestVoltage = (data) => {
  const lines = data.split("\n");
  let total = 0;

  for (const line of lines) {
    const results = [];
    const digits = line.split("").map(Number);
    const max = Math.max(...digits);
    const indexOfMax = digits.indexOf(max);
    const rest = digits.slice(indexOfMax + 1);
    if (rest.length === 0) {
      const digit = digits.slice(0, digits.length - 1);
      const maximum = Math.max(...digit);
      results.push(maximum, max);
    } else {
      results.push(max, Math.max(...rest));
    }

    total += Number(results.join(""));
  }

  return total;
};
