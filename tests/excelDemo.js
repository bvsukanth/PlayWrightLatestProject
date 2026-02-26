const Exceljs = require('exceljs');
let output = { row: -1, column: -1 };

async function writeexcelTest(searchText, replaceText, data, file) {


    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(file)


    const worksheet = workbook.getWorksheet('Sheet1');
    readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replaceText;
    const cell1 = worksheet.getCell(output.row + data.rowChange, output.column + data.columnChange);
    cell1.value = data.priceChange;
    await workbook.xlsx.writeFile(file);


}

async function readExcel(worksheet, searchText) {

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
}

writeexcelTest("Banana", "Republic", { rowChange: 0, columnChange: 2, priceChange: "3500" }, "C:\\Users\\bvsuk\\Downloads\\download.xlsx");

