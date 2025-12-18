const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  mathsProblem(data);
});

const mathsProblem = (data) => {
  const lines = data.split("\n");
  const rows = lines.map((item) =>
    item
      .split(/(\s+)?(\S+)?(\t+)?/)
      .map((item) => (Number(item) ? Number(item) : item))
  );

  const columnLength = Math.max(...rows.map((row) => row.length));
  let allTotals = 0;

  for (let column = 0; column < columnLength; column++) {
    const symbol = rows[rows.length - 1][column];

    if (!symbol) continue;

    let total = symbol === "*" ? 1 : 0;

    for (let row = 0; row < rows.length - 1; row++) {
      if (symbol === "*") {
        total *= rows[row][column];
      } else if (symbol === "+") {
        total += rows[row][column];
      }
    }
    allTotals += total;
  }

  return allTotals;
};
