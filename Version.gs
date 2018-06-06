/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
**************************************************************************/

/**
* Global Variables.
* Availabile to all functions in all .gs script files. 
*/

GITHUB_URL = "https://raw.githubusercontent.com/99-metrics/ga-realtime-alerting/master/Menu.gs";
SHEET_URL = SpreadsheetApp.getActiveSpreadsheet().getUrl();
SHEET_NAME = SpreadsheetApp.getActiveSpreadsheet().getName();

function checkScriptVersion(){
  var response = UrlFetchApp.fetch(GITHUB_URL);
  var currentVersion = ScriptApp.getResource("Menu").getDataAsString().match(/Version:\s[0-9]+\.[0-9]+/);
  var latestVersion = response.getContentText().match(/Version:\s[0-9]+\.[0-9]+/);
  
  if(currentVersion != latestVersion)
    Logger.log("update needed");
    return;
  
  {MailApp.sendEmail(USER_EMAIL, "GA Real Time Alerting: Script Update", "There's a new version of the Real Time Alerting Script. To get the new version copy the script files from here https://github.com/99-metrics/ga-realtime-alerting");
  }
}
