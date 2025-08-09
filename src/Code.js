function mySheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1")
}

function myData(){
  return mySheet().getDataRange().getValues()
}

function getData(){

  const values = myData()

  const headers = values[0]

  const output = []

  for ( let i = 1; i < values.length; i++){
    const row = {}
    for (let j = 0; j < headers.length;j++){
      row[headers[j]] = values[i][j]
    }
    output.push(row)
  }

  return JSON.stringify(output)
}

function addData(data) {
  const sheet = mySheet();

  const headers = myData()[0]

  const idColumnIndex = headers.indexOf('id');
  let nextId = 1;

  if (idColumnIndex !== -1) {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const lastId = sheet.getRange(lastRow, idColumnIndex + 1).getValue();
      nextId = (typeof lastId === 'number' && !isNaN(lastId)) ? lastId + 1 : 1;
    }
  }

  const row = headers.map(header => {
    if (header === 'id') return nextId;
    return data[header] || '';
  });

  sheet.appendRow(row);
  return row
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('Petite Vue Pico')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}