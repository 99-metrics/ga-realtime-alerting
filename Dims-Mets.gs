/**************************************************************************
*  Realtime Alerting for Google Analytics
*  Version: 1.0
*  Authors: Dan Gilbert @dangilbertnow & Ed Guccione @triweasel
**************************************************************************/

/**
* Global Variables.
* Availabile to all functions in all .gs script files. 
*/

/* Array of regular expressions for valid dimensions */
DIMENSION_REGEXS = [
  "rt:userType",
  "rt:minutesAgo",
  "rt:referralPath",
  "rt:campaign",
  "rt:source",
  "rt:medium",
  "rt:trafficType",
  "rt:keyword",
  "rt:goalId",
  "rt:browser",
  "rt:browserVersion",
  "rt:operatingSystem",
  "rt:operatingSystemVersion",
  "rt:deviceCategory",
  "rt:mobileDeviceBranding",
  "rt:mobileDeviceModel",
  "rt:country",
  "rt:region",
  "rt:city",
  "rt:latitude",
  "rt:longitude",
  "rt:pagePath",
  "rt:pageTitle",
  "rt:appName",
  "rt:appVersion",
  "rt:screenName",
  "rt:eventAction",
  "rt:eventCategory",
  "rt:eventLabel"
];

/* Array of regular expressions for valid metrics */
METRIC_REGEXS = [
  "rt:activeUsers",
  "rt:goal[0-9]{1,2}Value",
  "rt:goalValueAll",
  "rt:goal[0-9]{1,2}Completions",
  "rt:goalCompletionsAll",
  "rt:pageviews",
  "rt:screenViews",
  "rt:totalEvents"
];

/**
* Creates a regex of valid expressions for dimensions or metrics.
* @param {string} type - Either 'dimensions' or 'metrics'.
* @return {RegExp} regex
*/
function getRegex(type) {
  switch(type) {
    case "dimensions":
      var regex = new RegExp(DIMENSION_REGEXS.join("|"), 'i');
      break;
    case "metrics":
      var regex = new RegExp(METRIC_REGEXS.join("|"), 'i');
      break;
    case "viewId":
      var regex = /^ga:[0-9]{8}$|^ga:[0-9]{9}$/i;
      break;      
    default:
      throw new Error("Invalid type.  Valid types are 'dimensions', 'metrics' or 'viewId'.");
  }
  Logger.log(regex);  
  return(regex);
}
