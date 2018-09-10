/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert - @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Creates Realtime Alerting Menu when file is opened.
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('GA Realtime')
  .addItem('Create Configuration Sheet', 'menuItem7')
  .addItem('Create New Alert', 'menuItem8')
  .addItem('Check Alert Configurations', 'menuItem6')
  .addSubMenu(ui.createMenu('Schedule Alerting')
              .addItem('Every 5 minutes', 'menuItem1')
              .addItem('Every 10 minutes', 'menuItem2')
              .addItem('Every 15 minutes', 'menuItem3')
              .addItem('Every 30 minutes', 'menuItem4')
              .addItem('Stop Monitoring', 'menuItem5'))
  .addToUi();
}

/**
* Menu items and functions to be executed
*/
function menuItem1() {
  removeTriggers();
  createTrigger(5);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be checked every 5 minutes.");
}

function menuItem2() {
  removeTriggers();
  createTrigger(10);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 10 minutes.");
}

function menuItem3() {
  removeTriggers();
  createTrigger(15);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 15 minutes.");
}

function menuItem4() {
  removeTriggers();
  createTrigger(30);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 30 minutes");
}

function menuItem5() {
  removeTriggers();
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerting has now been stopped.");
}

function menuItem6() {
  testAlertConfigurations();
  SpreadsheetApp.getUi().alert("All alerts checked successfully against the Realtime API.");    
}

function menuItem7() {
  setupConfiguration();
}

function menuItem8() {
  addAlert(SS.getSheetByName("Alert-Configuration"));
}
