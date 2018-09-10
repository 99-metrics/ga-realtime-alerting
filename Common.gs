/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert - @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Sets a script property with supplied name and value.
* Properties can be viewed from 'File > Project Properies > Script Properties'
* @param {string} property - Property name
* @param value - Property value
*/
function setScriptProperty(property, value) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(property, value);
}

/**
* Reads a script property and returns value
* @param {string} property - Property name
* @return property value
*/
function readScriptProperty(property) {
  var scriptProperties = PropertiesService.getScriptProperties();
  return(scriptProperties.getProperty(property));  
}

/**
* Sets realtime monitoring trigger at provided frequency
* @param {integer} frequency - Monitoring frequency in minutes
* @return property value
*/
function createTrigger(frequency) {
  ScriptApp.newTrigger('realtimeMonitoring')
  .timeBased()
  .everyMinutes(frequency)
  .create();
}

/**
* Removes all script triggers
*/
function removeTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
* Inserts a new sheet into the active spreadsheet.
* If a sheet with the same name exists already, it is deleted first.
* @param {string} sheetname - Name of new sheet
*/
function insertSheet(sheetname) {
  var sheet = SS.getSheetByName(sheetname);
  if (sheet != null) {
    SS.deleteSheet(sheet);
  } 
  SS.insertSheet(sheetname);
  sheet = SS.getSheetByName(sheetname);
  sheet.deleteColumns(16, 11);  
  sheet.activate();
  SS.moveActiveSheet(SS.getSheets().length);
}

/**
* Deletes surplus rows and columns from a given sheet within the active spreadsheet.
* @param {string} sheetname - Name of worksheet
*/
function trimSheet(sheetname) {
  var trim = SS.getSheetByName(sheetname);
  var lastCol = trim.getLastColumn();
  var lastRow = trim.getLastRow();
  var maxCols = trim.getMaxColumns();
  var maxRows = trim.getMaxRows();

  if (maxCols > lastCol && lastCol > 0) {
    trim.deleteColumns(lastCol + 1, maxCols - lastCol);
  }
  
  if (maxRows > lastRow && lastRow > 0) {
    trim.deleteRows(lastRow + 1, maxRows - lastRow);
  }
  trim.activate();
}
