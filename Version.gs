/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Global Variables.
* Availabile to all functions in all .gs script files. 
*/

GITHUB_URL = "https://raw.githubusercontent.com/99-metrics/ga-realtime-alerting/master/Version.gs";
SHEET_URL = SpreadsheetApp.getActiveSpreadsheet().getUrl();
SHEET_NAME = SpreadsheetApp.getActiveSpreadsheet().getName();

function checkScriptVersion(){
  var response = UrlFetchApp.fetch(GITHUB_URL);
  var currentVersion = ScriptApp.getResource("Version").getDataAsString().match(/Version:\s[0-9]+\.[0-9]+/)[0];
  Logger.log(currentVersion);
  var latestVersion = response.getContentText().match(/Version:\s[0-9]+\.[0-9]+/)[0];
  Logger.log(latestVersion);
  
  if(currentVersion != latestVersion) {  
    MailApp.sendEmail(USER_EMAIL, "GA Real Time Alerting: Script Update", "<p>There's a new version of the Real Time Alerting Script.</p><p>To get the new version copy the script files from here https://github.com/99-metrics/ga-realtime-alerting</p>");
  };
}
