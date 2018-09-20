/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Global Variables.
* Availabile to all functions in all .gs script files. 
*/

CONFIG_LABELS = [
  ["Alert Name"],
  ["View ID"],
  ["Metric"],
  ["Dimensions"],
  ["Filters"],
  ["Alert Threshold"],
  ["Alert Over or Under"],
  ["Alert On Time (Hour)"],
  ["Alert Off Time (Hour)"],
  ["Alert Active Days"],
  ["Alert Expiry Time (Minutes)"],
  ["Email Recipients"],
  ["Email Subject"],
  ["Email Intro Text"]
];

CONFIG_EXAMPLE = [
  ["Example-Alert"],
  ["ga:123456789"],
  ["rt:pageviews"],
  ["rt:browser"],
  [""],
  ["1"],
  ["over"],
  ["9"],
  ["17"],
  ["All days"],
  ["1440"],
  [""],
  ["Alert threshold breached"],
  ["Alert intro paragraph"]
];

CONFIG_NOTES = [
  ["The name of your alert will be used as the alert email subject."],
  ["Google Analytics view id.   Format: ga:xxxxxx"],
  ["Realtime metric to be monitored."],
  ["Comma separated list of Realtime API dimensions."],
  ["Realtime API filters"],
  ["The threshold to be exceeded to trigger an alert email."],
  [""],
  [""],
  [""],
  [""],
  [""],
  ["Comma separated list of email addresses."],
  [""],
  [""]
];

CONFIG_COLOURS_DARK = [
  ["#20124d"],
  ["#134f5c"],
  ["#134f5c"],
  ["#134f5c"],
  ["#134f5c"],
  ["#741b47"],
  ["#741b47"],
  ["#741b47"],
  ["#741b47"],
  ["#741b47"],
  ["#741b47"],
  ["#0b5394"],
  ["#0b5394"],
  ["#0b5394"]
];

CONFIG_COLOURS_LIGHT = [
  ["#d9d2e9"],
  ["#d0e0e3"],
  ["#d0e0e3"],
  ["#d0e0e3"],
  ["#d0e0e3"],
  ["#ead1dc"],
  ["#ead1dc"],
  ["#ead1dc"],
  ["#ead1dc"],
  ["#ead1dc"],
  ["#ead1dc"],
  ["#cfe2f3"],
  ["#cfe2f3"],
  ["#cfe2f3"]
];

METRICS = [
  "rt:activeUsers",
  "rt:pageviews",
  "rt:screenviews",
  "rt:totalEvents"
];

function setupConfiguration() {
  var sheetname = "Alert-Configuration";
  addConfigSheet(sheetname);
  var newConfig = SS.getSheetByName(sheetname);
  addHeadings(newConfig);
  trimSheet(sheetname);
  addAlert(newConfig);
}

function addConfigSheet(sheetname) {
  if(CONFIG == null) {
    insertSheet(sheetname);    
  } else {
    if(SS.getSheetByName("Backup-Alert-Configuration")!= null){
      SS.deleteSheet(SS.getSheetByName("Backup-Alert-Configuration"));}
    CONFIG.setName("Backup-" + sheetname);
    insertSheet(sheetname);
  }
  var newConfig = SS.getSheetByName(sheetname);
  SS.setActiveSheet(newConfig);
  SS.moveActiveSheet(0);
}

function addHeadings(sheet) {
  sheet.getRange("A1:A" + CONFIG_LABELS.length)
  .setValues(CONFIG_LABELS)
  .setNotes(CONFIG_NOTES)
  .setBackgrounds(CONFIG_COLOURS_DARK)
  .setFontColor("#f3f3f3");
  sheet.setColumnWidth(1, 200);
}

function addAlert(sheet) {
  if(sheet == null) {
    setupConfiguration();
    return;
  }
  sheet.insertColumnAfter(sheet.getLastColumn());
  var alertColumn = sheet.getLastColumn() + 1;
  sheet.getRange(1, alertColumn, CONFIG_EXAMPLE.length, 1)
          .setValues(CONFIG_EXAMPLE)
          .setBackgrounds(CONFIG_COLOURS_LIGHT)
          .setFontColor("black")
          .setWrap(true);
  
  setValidation(sheet, alertColumn);
}

function setValidation(sheet, column) {
  setListValidation(sheet.getRange(3, column), METRICS);
  setCustomFormulaValidation(sheet.getRange(6, column), "=ISNUMBER(B6)");
  setNumberValidtion(sheet.getRange(8, column, 2, 1), 0, 23);
  setListValidation(sheet.getRange(7, column), ['over', 'under'])
  setListValidation(sheet.getRange(10, column), ['All days', 'Weekdays'])
  setNumberValidtion(sheet.getRange(11, column), 1, 1440);
}


function setListValidation(range, values) {
  range.setDataValidation(SpreadsheetApp.newDataValidation()
                          .setAllowInvalid(false)
                          .requireValueInList(values, true)
                          .build());
}

function setNumberValidtion(range, lowest, highest) {
  var rule = SpreadsheetApp.newDataValidation()
  .setAllowInvalid(false)
  .requireNumberBetween(lowest, highest)
  .build();
  range.setDataValidation(rule);
}

function setCustomFormulaValidation(range, formula) {
  var rule = SpreadsheetApp.newDataValidation()
  .setAllowInvalid(false)
  .requireFormulaSatisfied(formula)
  .build();
  range.setDataValidation(rule);
}
