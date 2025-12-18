const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  tachyonBeams(data);
});

const replaceAt = (line, index, symbol) => {
  const arr = line.split("");

  if (symbol === "^") {
    arr[index] = "^";
    if (index - 1 >= 0 && arr[index - 1] !== "^") {
      arr[index - 1] = "|";
    }
    if (index + 1 < arr.length && arr[index + 1] !== "^") {
      arr[index + 1] = "|";
    }
    return arr.join("");
  }

  arr[index] = "|";
  return arr.join("");
};

const tachyonBeams = (data) => {
  const lines = data.split("\n");
  let count = 0;
  const countedSplitters = new Set();

  for (let i = 0; i < lines.length; i++) {
    let changed = true;
    while (changed) {
      changed = false;

      for (let j = 0; j < lines[i].length; j++) {
        const beamAbove = i > 0 && lines[i - 1][j] === "|";

        if (lines[i][j] === "S") {
          lines[i + 1] = replaceAt(lines[i + 1], j, "|");
        }

        if (beamAbove && lines[i][j] === ".") {
          const newRow = replaceAt(lines[i], j, "|");
          if (newRow !== lines[i]) {
            lines[i] = newRow;
            changed = true;
          }
        }

        if (beamAbove && lines[i][j] === "^") {
          if (!countedSplitters.has(`${i}, ${j}`)) {
            countedSplitters.add(`${i}, ${j}`);
            count++;
          }

          const newRow = replaceAt(lines[i], j, "^");
          if (newRow !== lines[i]) {
            lines[i] = newRow;
            changed = true;
          }
        }
      }
    }
  }

  return count;
};
