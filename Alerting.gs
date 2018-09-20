/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Global Variables.
* Availabile to all functions in all .gs script files. 
*/

SS = SpreadsheetApp.getActiveSpreadsheet();
CONFIG = SS.getSheetByName("Alert-Configuration");
USER_EMAIL = Session.getActiveUser().getEmail();
SEND_ANALYTICS_DATA = true;

/**
* Main function scheduled as a project trigger to check realtime alerts. 
* Reads alert configurations from sheet, checks each alert against the Realtime API,
* and sends email notifications if valid alerts are breached.
* If alert checking fails an email is sent to alert recipients.
*/
function realtimeMonitoring() {
  var alerts = getAlerts();
  alerts.forEach(function (alert) {
    try {
      checkAlert(alert);
    } catch(e) {
      MailApp.sendEmail(USER_EMAIL, "Real Time Alerting errors",alert + " ERROR: " + e.message + " ERROR LINE: " + e.lineNumber);
    }
  });
}

/**
* Tests queries against the Realtime API to ensure they do not error.  Function is available from the Sheets menu.
* Reads alert configurations from sheet, checks each alert against the Realtime API.
* If alert configurations are correct returns message 'All alerts checked successfully against the Realtime API.'
* If an alert configuation is not correct it returns an error alert with alert name and error details
*/
function testAlertConfigurations() {
  var alerts = getAlerts();
  alerts.forEach(function (alert) {
    try {
      alert = createAlertObject(alert);
      alertConfigValidation(alert);
      var response = JSON.parse(getRealtimeResponse(alert.query.viewId, alert.query.metrics, alert.query.options));
    } catch(e) {
      var errorMsg = "Invalid alert.  Check your alert configuration.  Alert Name: " + alert.name + " Error: " + e.message;
      throw new Error(errorMsg);
    }
  });
}

/**
* Validates alert configuration, checks alert is within hours, gets Realtime API
* and sents alert notification email if threshold has been breached.
* @param {Array} alert - Alert configuration from Sheet
*/
function checkAlert(alert) {
  alert = createAlertObject(alert);
  alertConfigValidation(alert);
  alert.checks = checkAlertTimes(alert);
  
  if(isAlertValidNow(alert.checks) === true) {
    alert.results = getAlertResults(alert.query);
    alert.checks.breached = alertThresholdBreached(alert.settings, alert.results.total);      
  };
  
  if(alert.checks.breached === true) {
    sendAlert(alert);
  };
}

/**
* Reads alerts from Alert-Configuration sheet and transposes to horizontal array
* @return {Array} alerts - Alert configuration read from Sheet
*/
function getAlerts(){
  if(CONFIG.getLastColumn() >= 2) {
    var alertData = CONFIG.getRange(1, 2, CONFIG.getLastRow(), CONFIG.getLastColumn()-1).getValues();
    var alerts = transposeSheetsDataRange(alertData);
    return(alerts);
  } else {
    throw new Error( "No alert configurations found." );
  };
}

/**
* Transposes vertical array of Sheets cells and returns a horizontal array. 
* @param {Array} range - Vertical array of alert configurations
*/
function transposeSheetsDataRange(range){
  return Object.keys(range[0]).map( function (column) { 
    return range.map(function (row) { 
      return row[column];
    });
  });
}

/**
* Creates an alert object containing alert name, Realtime API query, and alert/email settings.
* @param {Array} a - Array of alert configuration paramters
* @return {Object} alert - Object containing all alert configuration paramters
*/
function createAlertObject(a) {
  var alert = {};
  alert.name = a[0];
  alert.query = {
    "viewId" : a[1],
    "metrics" : a[2]
  };
  
  alert.query.options = {
    "sort" : "-"+a[2]
  };  
  
  if(a[3]) { alert.query.options.dimensions = a[3].split(/[\s\,]+/gi).join(",").trim() };
  if(a[4]) { alert.query.options.filters = a[4] };
  
  alert.settings = {
    "threshold" : a[5],
    "direction" : a[6],
    "startHour" : a[7],
    "endHour" : a[8],
    "activeDays" : a[9],
    "expiry" : a[10]
  };
  alert.email = {
    "recipients" : a[11],
    "subject" : a[12],
    "intro" : a[13]
  }
  return(alert);
}

/**
* Checks if time now is within specified alerting hours/days and if the last alert has elapsed.
* @param {Object} alert - Alert object containing alert hours/days paramters
* @return {Object} checks - Object containing check results
*/
function checkAlertTimes(alert) {
  var checks = {};
  checks.withinHours = isAlertWithinHours(alert.settings.startHour, alert.settings.endHour);
  checks.withinDays = isAlertWithinDays(alert.settings.activeDays);
  checks.lastAlerted = readScriptProperty(alert.name);
  checks.expired = hasPreviousAlertExpired(alert.name, alert.settings.expiry);
  return(checks);
}

/**
* Validates alert configuration paramters.  Checks for required paramters and validates view ID, 
* metrics, dimensions, alert days/hours and expiry time. 
* @param {Object} alert - Alert object containing all alert configuration parameters.
*/
function alertConfigValidation(alert) {
  if(!alert.name) { throw new Error( "An alert name must be provided" ); };  
  if(!alert.query.viewId) { throw new Error( "A view ID must be provided" ); };
  if(!alert.query.metrics) { throw new Error( "A metric must be provided" ); };
  if(!alert.settings.threshold) { throw new Error( "An alert threshold must be provided" ); };
  if(!alert.settings.direction) { throw new Error( "An alert direction must be provided" ); };
  if(!alert.email.recipients) { throw new Error( "At least one recipient email address must be provided." ); };
  
  var dimensionsRegex = getRegex("dimensions");
  var metricsRegex = getRegex("metrics");
  var viewIdRegex = getRegex("viewId");
  
  if(!viewIdRegex.test(alert.query.viewId)) { throw new Error("This is not a valid view ID");};
  if(!metricsRegex.test(alert.query.metrics)) { throw new Error("This is not a valid metric");};
  
  if(alert.query.options.dimensions) {
    var dimensions = alert.query.options.dimensions.split(",");
    dimensions.forEach(function (dimension) {
      if(!dimensionsRegex.test(dimension)) { 
        throw new Error("Invalid dimension provided: " + dimension);
      }; 
    });
  };
  
  var threshold = alert.settings.threshold;
  if(threshold < 0) { throw new Error("The threshold is not valid"); };
  
  var startHour = alert.settings.startHour;
  var endHour = alert.settings.endHour;
  if(startHour < 0 || startHour > 23 || startHour > endHour) { throw new Error("The start hour is not valid"); };
  if(endHour < 0 || endHour > 23 || endHour < startHour) { throw new Error("The end hour is not valid"); };
  
  var expiry = alert.settings.expiry;
  if(expiry < 0 || expiry > (24*60)) { throw new Error("The expiry time is not valid"); };
}

/**
* Checks if alert is within alerting days/hours and whether last alert has expired.
* @param {Object} checks - Alert object containing alert days/hour settings.
* @return {boolean}
*/
function isAlertValidNow(checks) {
  if(checks.withinDays === true && checks.withinHours === true && checks.expired == true) {
    return(true);
  } else {
    return(false);
  }
}

/**
* Sends alert containing HTML table if required and sets Script property with time email was sent
* @param {Object} alert Object created with params from config sheet and results of API query
*/

function sendAlert(alert) {
  if(alert.results.total > 0) { alert.email.table = convertResultsToHTMLTable(alert.results); };
  emailAlert(alert.name, alert.results, alert.email);
  setScriptProperty(alert.name, new Date());
}

/**
* Query Realtime API and return response 
* @param {string} viewId GA view ID as 8 or 9 character numeric string with ga:
* @param {string} metrics Single GA realtime metric: https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/
* @param {Object} options Object of sort (defaulted to large to small), dimensions and filters
* @return {Object} JSON formatted results of Realtime query formatted as here:
*    https://developers.google.com/analytics/devguides/reporting/realtime/v3/reference/data/realtime#resource
*/

function getRealtimeResponse(viewId, metrics, options) {
  return(Analytics.Data.Realtime.get(viewId, metrics, options));
}

/* Send alert to recipients and update last alerted timestamp */
function emailAlert(name, results, email) {
  if(!email.subject) { email.subject = name + " - Alert threshold exeeded"; };
  if(!email.intro) { email.intro = "Threshold exeeded for alert: " + name; };
  if(results.total != 0) {
    email.body = "<p>" + email.intro + "</p><p>Total: " + results.total + "</p><br>" + email.table;
  } else {
    email.body = "<p>" + email.intro + "</p><p>Total: " + results.total
  }
  MailApp.sendEmail(email.recipients, email.subject, email.body, {"htmlBody" : email.body});
}

/**
*Convert Realtime results into HTML table
* @param {Object} results - Object containing headers, rows and totals for Realtime API query 
* @return {string} table -  HTML table of headers and rows of RealTime API reults
*/ 

function convertResultsToHTMLTable(results) {
  var headers = "<tr style=\"text-align:left\"><th>" + results.headers.join("</th><th>") + "</th></tr>";
  var rows = results.rows.map(function (row) {
    return("<tr><td>" + row.join("</td><td>") + "</td></tr>");
  });
  var table = "<table>" + headers + rows.join("") + "</table>";
  return(table);   
  
}

/**
* Return GA realtime API data for an alert 
* function parses JSON response from getRealtimeResponse function
* @param {Object} query complete GA query Object requires viewId, metrics and options (filters & dimensions)
* @return {Object} results - Object containing headers, rows and totals for Realtime API query 
*/

function getAlertResults(query) {
  var response = JSON.parse(getRealtimeResponse(query.viewId, query.metrics, query.options));
  var results = {};
  results.headers = response.columnHeaders.map(function (header) {
    return(header.name);
  });
  results.rows = response.rows;
  results.total = response.totalsForAllResults[query.metrics];
  return(results);
}

/**
* Check whether last alert email has expired
* function compares the difference between now & last time the alert was triggered from the ScriptProperty 
* @param {string} alertName in order capture the last alert time using readScriptProperty
* @param {integer} emailExpiry number of minutes after previous email that alert becomes active
* @return {Boolean}
*/

function hasPreviousAlertExpired(alertName, emailExpiry) {
  var lastAlerted = readScriptProperty(alertName);
  if(!lastAlerted) { 
    return (true);
  };
  lastAlerted = Date.parse(lastAlerted);
  var runTime = new Date();
  var difference = runTime - lastAlerted;
  var emailExpiryMilliseconds = emailExpiry * 60 * 1000;
  if(difference > emailExpiryMilliseconds) {
    return (true);
  } else {
    return (false);
  }
}  

/**
* Check whether current time is within alert hours
*   function compares the current hour of the day with the hours of activity in the user config settings
* @param {integer} startHour hour when alert should become active - can be empty
* @param {integer} endHour hour when alert should become inactive - can be empty
* @return {Boolean}
*/

function isAlertWithinHours(startHour, endHour) {
  var hourNow = new Date().getHours();
  if(!startHour) { startHour = 0; };
  if(!endHour) { endHour = 23; };
  if(hourNow >= startHour && hourNow <= endHour) {
    return(true);
  } else {
    return(false);
  }
}

/**
* Check whether current time is within alert days 
*   compares the current day of the week with the day of the week in the user config settings
* @param {string} alertDays Days when alert should be active "All days" or  "Weekdays"
* @return {Boolean}
*/
function isAlertWithinDays(alertDays) {
  var dayNow = new Date().getDay();
  if(!alertDays) { alertDays = "All days"; };
  Logger.log(dayNow)
  switch(alertDays) {
    case "All days":
      return(true);
      break;
    case "Weekdays":
      switch(dayNow) {
        case 6:
          return(false);
          break;
        case 0: 
          return(false);
          break;
        default:
          return(true);
      }
      break;
    default:
      return(false);
  }
}

/**
Check whether current time is within alert hours
* @param {Object} config alert settings Object that is supplies alert direction and threshold
* @param {integer} total Total number of occurences of situation monitored 
* @return {Boolean}
*/
function alertThresholdBreached(config, total) {
  switch(config.direction) {
    case "over":
      if(total > config.threshold) { return(true); };
      break;
    case "under":
      if(total < config.threshold) { return(true); };
      break;
    default:
      return(false);
  }
}
