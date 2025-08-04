function mySheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1")
}

function myData(){
  return mySheet().getDataRange().getValues()
}

function getData(){
  const sheet = mySheet();

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

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('Petite Vue Pico')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}