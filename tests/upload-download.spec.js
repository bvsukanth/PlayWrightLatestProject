const Exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

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

//writeexcelTest("Banana", "Republic", { rowChange: 0, columnChange: 2, priceChange: "3500" }, "C:\\Users\\bvsuk\\Downloads\\download.xlsx");

test('upload and download excel validation', async ({browser}) => {

    const context = await browser.newContext({
        acceptDownloads: true,
        downloadsPath: 'C:\\Users\\v-vbezavada\\Downloads\\'
    });
    const page = await context.newPage();
    const textSearch = 'Apple';
    const replaceText = 'iPhone';
    const price = "1000";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeexcelTest(textSearch, replaceText, { rowChange: 0, columnChange: 2, priceChange: price }, "C:\\Users\\v-vbezavada\\Downloads\\download.xlsx");

    //below setInputFiles works only when type=file attribute is there in DOM
    await page.locator("#fileinput").setInputFiles("C:\\Users\\v-vbezavada\\Downloads\\download.xlsx");

    //const textlocator = page.getByText(replaceText);
    //const desiredRow = await page.getByRole('row').filter({has:textlocator});
    await expect(page.locator("#cell-4-undefined").nth(1)).toContainText(price);

})

