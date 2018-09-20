/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Creates Realtime Alerting Menu when file is opened.
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('GA Realtime')
  .addItem('Create Configuration Sheet', 'menuItem1')
  .addItem('Create New Alert', 'menuItem2')
  .addItem('Check Alert Configurations', 'menuItem3')
  .addSubMenu(ui.createMenu('Schedule Alerting')
              .addItem('Every 5 minutes', 'menuItem4')
              .addItem('Every 10 minutes', 'menuItem5')
              .addItem('Every 15 minutes', 'menuItem6')
              .addItem('Every 30 minutes', 'menuItem7')
              .addItem('Stop Monitoring', 'menuItem8'))
  .addToUi();
}

/**
* Menu items and functions to be executed
*/

function menuItem1() {
  setupConfiguration();
  sentHitToGA("/create-config-sheet");
}

function menuItem2() {
  addAlert(SS.getSheetByName("Alert-Configuration"));
  sentHitToGA("/add-alert");
}

function menuItem3() {
  testAlertConfigurations();
  SpreadsheetApp.getUi().alert("All alerts checked successfully against the Realtime API.");
  sentHitToGA("/check-alerts");
}

function menuItem4() {
  removeTriggers();
  createTrigger(5);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be checked every 5 minutes.");
  sentHitToGA("/schedule-05-mins");
}

function menuItem5() {
  removeTriggers();
  createTrigger(10);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 10 minutes.");
  sentHitToGA("/schedule-10-mins");
}

function menuItem6() {
  removeTriggers();
  createTrigger(15);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 15 minutes.");
  sentHitToGA("/schedule-15-mins");
}

function menuItem7() {
  removeTriggers();
  createTrigger(30);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerts will be monitored every 30 minutes");
  sentHitToGA("/schedule-30-mins");
}

function menuItem8() {
  removeTriggers();
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  .alert("Alerting has now been stopped.");
  sentHitToGA("/stop-monitoring");
}
