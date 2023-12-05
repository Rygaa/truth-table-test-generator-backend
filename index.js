const express = require("express");
const ExcelJS = require("exceljs");
const app = express();
const port = 3550;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("./src/routers/signup/signup.controller"));
app.use(require("./src/routers/login/login.controller"));
app.use(require("./src/routers/auto-login/auto-login.controller"));
app.use(require("./src/routers/create-type/create-type.controller"));
app.use(require("./src/routers/delete-type/delete-type.controller"));
app.use(require("./src/routers/create-project/create-project.controller"));
app.use(require("./src/routers/delete-project/delete-project.controller"));
app.use(require("./src/routers/create-condition/create-condition.controller"));
app.use(require("./src/routers/delete-condition/delete-condition"));
let combinations = [];
let keys = [];
let tempCombination = {};
let values = [];

async function generate(valeues) {
  combinations = [];
  values = valeues;
  keys = Object.keys(values);
  tempCombination = {};
  await generateCombinations(0);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Truth Table");
  worksheet.addRow(keys);
  for (let i = 0; i < combinations.length; i++) {
    const arr = [];
    for (j in combinations[i]) {
      arr.push(combinations[i][j]);
    }
    worksheet.addRow(arr);
  }

  await workbook.xlsx.writeFile("TruthTable.xlsx");
  return combinations;
}

async function generateCombinations(index) {
  if (index === keys.length) {
    combinations.push({
      ...tempCombination,
      isValid: validate(tempCombination),
    });
    return;
  }

  let key = keys[index];
  for (let i = 0; i < values[key].length; i++) {
    tempCombination[key] = values[key][i];
    generateCombinations(index + 1);
  }
}

function validate(combination) {
  return Object.values(combination).every((value) => {
    console.log(value)
    console.log(Boolean(value))
    return Boolean(value);
  });
}

async function readExcelFile() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("TruthTable.xlsx");
  const worksheet = workbook.getWorksheet("Truth Table");

  let table = [];
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    let rowData = [];
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      rowData.push(cell.value);
    });
    table.push(rowData);
  });

  return table;
}

// Endpoint to generate and return the truth table
app.post("/generate-truth-table", async (req, res) => {
  try {
    await generate(req.body);
    const table = await readExcelFile();
    res.json({ table });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
