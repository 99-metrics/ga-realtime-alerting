# ga-realtime-alerting
Uses Google Apps Script to query the Google Analytics Realtime API on a schedule - every 5, 10, 15 or 30 minutes - and sends an email alert when user-defined metric thresholds are reached.

**Example use cases** 

1.  Error alerts

Server errors are problems for any service, and you want to know about them straight away and if you don't have a separate service to monitor these errors Google Analytics is a good way to monitor them - so make sure they're tagged. Using the Real time API and this tool you could monitor 5XX errors and get an email alert if your service starts return them. 

For this example you'd set your alerts as below. The first alert would send you an email if a service sees more than 5 500 errors in the past 30 min but the second alert would send an email if 5 of any internal server alert was seen by a user (500,501,502 etc) and show yuo which errors had been seen. Using this configuration this alert would be sent at any time day or night on any day. Once an alert email has been sent, the tool would wait 60 min before sending another alert.

<img src="https://lh5.googleusercontent.com/rgqQ0davu4x78mdfqc0xo0RyR61bwat8UuNY9GDCd2nJ3zWvMbZLM_KbEvdvqZn5y6UPs4SUPUD3DD90nU_Kybjw-YthgpYZ2YHalb_vImQginAUwGSzyPxLmtRHaLUvMk1KjXu6" width="500">

2.  More then/fewer than expected number of views?

Do you expect a certain number of certain events during the working week? The first alert would alert you if more than your expected number of 'submissions' were seen the second if less..


The first alert would check if you’d had more than 500 submissions and send and email to you (and the head of warehouse!) to warn you there was a tonne of submissions coming in, because you know you’ll go in investigate this immediately this alert won’t send another email for 2 hours. The second alert will send an email if there have been fewer than 100 submissions in the last 30 min.

<img src="https://lh5.googleusercontent.com/apvzqgxVQ42x_p4x1KiTJdjUSK39vDFaWARJkEY9RriK__4rtwsS6VFs9_hpMOBD97dMXn4PQZfJnuIsZfhSrMC9gVNXlOhli7glN2V10gJOKWmKGKqmmYQrlzZSZKGa6ixJVzfY" width="500">

The emails aren’t super pretty and will look like the example below but you could add html if you wanted to pretty them up (see the bolding using strong tags in the google sheet cell). If you add a dimension as shown in example 1. you’ll get a basic table of the break down.

<img src="https://lh3.googleusercontent.com/k6Qcs4KP-dW_mGqxrBRFpX6loZVrI7B1b80gfohGBbfMejifVPWE2IVebVkWShIRufr6l-WYYtRRQifVT6w5xqr8yKDjtvcpDPMF-OulwpidhvwakxmXjyTt9pZMk0QvtXVwPt_q" width="366">

You could be clever and make your thresholds dynamic based on the latest GA information or change based on the time of day using google sheets formula… enjoy


# Setup guide 

Make a copy of the **script template**

[From this read-only version of the script](https://docs.google.com/spreadsheets/d/1wTwNSAeoSuTU-mVEPqHATPMVWCzvLxs4zsRtn9G1Bz0/edit?usp=sharing)

This will hopefully be up to date with the latest version of the scripts but it's worth checking!

[When you've made your copy you need to set up the script - jump to the script set up guide](#script-setup-guide)

or **copy scripts from GitHub** 

To do this create a brand new Google Sheet and go to **Tools > Script editor from the menu**.

<img src="https://lh5.googleusercontent.com/A3Sh4MxmLcU2kagFK6RniVzahCI15qL8BnT-36c5gCrllAfzQjhvijkVMDkoRWVpOOurvEux_pC7B2Wm9wCVl4Qeb68CLTxbEe4UbMDAnaaofbo8xhEcID3U5yVTVmvSM2vq6hqM">

**Create 6 scripts** 

<img src="https://lh3.googleusercontent.com/xucPGtDJaH4WQMNu8AGSy_GXNL_nE8X274-26QRF-Le5-BFsxCcsGBqMRaZ4Yxpqd3W8sVFg_s8u06xVvhUP_eWfgpttHqt3NExK_xsg0zlqsDEZ-Vzj3nhGsPb334H-h9hnD86z" width="366">

called... (case sensitive)

Alerting,
Common,
Config-Sheet,
Dims-Mets,
Menu,
Version,

Copy and paste the scripts from the **raw** GitHub versions (delete the “function myFunction() {}”)

<img src="https://lh4.googleusercontent.com/brzY61rbErhusGUrFAed36ji1HEQFZASF7x1IqDSuBwHLGPVDhsNOW6oDIUUpd74-NfozVPEJEDzXxPVC258J-0x6dDR7Yjm_6EwahfSukXoT-JFhvb058uC0_yoqS2pCpZ0-JWV" width="366">

Save your script (and name it)

# Script setup guide 

Go to **Tools > Script Editor**

then **Resources > Advanced Google services.**

![ScreenShot](https://lh3.googleusercontent.com/8PsiEn4304XjE0xPnoQGTaXeR3gEOk5dzPRaA75OySjR1PpYFpNEQV3FOpHK2AvUZJLBJTKPdPaFyhj_HgBl1oHPbegkbe5-HRNOQm9s19uXQgfmbh9YDweBTTO18wa8C1cGJxmi)

Turn on **Google Analytics API v3.**

<img src="https://lh3.googleusercontent.com/rH7aJGl5_IaS1mXX2TE41X8OoLKktDB9PzhOHwM3lJG71gVGe04xw7M5iFsGRgwQvRHpKw4MlSbthFOQyeUKlk9N5uhMlyl9xTzn_0T_9wU2BPCw3fa-tRuJFoImQN4nLyFaHNOf" width="366">

Click the link to **Google Developers Console**.

![ScreenShot](https://lh3.googleusercontent.com/1oONHd4feSkJRJcErb1Xj1ayfWAdiYTc3bQW9Mab3W0PeLOQ0RFWU3bYSVadOin4dycMMGCAfZ_2HUSWX5ucfLVaroSGcXV4d7umZO-wIdM5V36Znov0Qvw_QoMDTszEA91Kqsod)

The **Developers Console** will open in a new tab.

<img src="https://lh5.googleusercontent.com/2hJXSmbqkv1fxcLyuSDBllXQJhDWd7J2O5wjTD3dR_sgHr2ND0oLa57hqoE2iU8WMlqI0XOv7O-D4e1OZ3WAqvVyq84nOZFuijHYmem7D-bzNiH3Mp9LPygaAy5jT6F1Xybz_L0b" width="602">

Search for and select the **Analytics API** NOT **Google Analytics Reporting API**

<img src="https://lh4.googleusercontent.com/VMgtoGNhSifjFpxZHvN8pqyG73mtq-TyO5ZayRCeV1F42_R2_l0cJ682fE3kggWKtRA1oy4nHzXiXblFy15FTR_OWIZvMqC6KDOcq98REkg42zN0L1jvtYbYjSxgt0_4jkmphTcB" width="400">

**Enable** the API and close the **Developers Console** tab.

<img src="https://lh5.googleusercontent.com/wuKt8Y9rZixMl6DC4haS5zdU50UJb__jZCHN8eGoQG6pkrm7zxW2b066CtJl0py1ooOv_KyMbnYnyghwV4z8OEFKzQUVV-RZnRxfKIrI1P_GvGEXq9NEDifiEbnmaUXsx4RhpZDk" width="400">

Click **Okay** to close the **Advanced Google Services** dialog box.

<img src="https://lh3.googleusercontent.com/rH7aJGl5_IaS1mXX2TE41X8OoLKktDB9PzhOHwM3lJG71gVGe04xw7M5iFsGRgwQvRHpKw4MlSbthFOQyeUKlk9N5uhMlyl9xTzn_0T_9wU2BPCw3fa-tRuJFoImQN4nLyFaHNOf" width="332">

An **updating settings** message will display at the top of the screen.

![ScreenShot](https://lh3.googleusercontent.com/-bNi5yT9mcawa1yQq86XzSc34HCMMbqKkPtrKnbSFSLJriNJ3p7j35Q6bId5jzUgnGm5wmWEJN_zZOanH_DsdYypDxDSTo6BA-R2yjwcd8vPdsBzUhdXQlAHMX_MxNtb80HVpU5F)

The script is now setup and you can close the Script Editor tab.

# Create Alerts

Refresh the browser - This generates the App menus 

You can either edit the example Alert provided in the sheet or

Go to **GA Realtime > Create Configuration Sheet** in the menu

The first time you run the script (by creating new alerts or config sheet or checking your alerts) you will be prompted to grant some permissions (text depends on what you named your script).

<img src="https://lh3.googleusercontent.com/84NuhfAUvBNTUu_BX1bJgo9OsIBHnwhp30wPMxkTNVCkFM6BEu43FGVrE3KexQRPxS90lG3xxvYCEqjm3eELCMBg0XcwZg3J6e8Jz7hvP5bhZiD01AxlC53N_w80EmlorEjokLI3" width="332">

Select **Continue** and **Allow** permissions in the next window.  

<img src="https://lh6.googleusercontent.com/xuXAwWA0OXPAg1pEbxoVqgAlgT4vMd6frbeFP4o4j6JgjpY6cOu29qWeuYeJuKZFICxqWY3f9EQqGH2ZctJq1McWa8CoSrka8_7Zv6PPLwBbe1uV-CuO7i5m_2AGrvl-QII-GlkS" width="332">
This is a standard alert/warning as the app script can access your GA data and the Google Sheet. 

Click **Advanced**.

<img src="https://lh4.googleusercontent.com/RCgI8kz8qhor8ff0t_IrB-37kERKR_65S7Q2KnE5Sfwz81mKGOJu5tI0uq2k8uCzH1V_9atJ6S1PgE2uwDDOd-MqSVYw88Bk5f4fxWB-nQes6bKyItr3-V3_QLOIa9w7LC9PXkYk" width="332">

Click Go to **Untitled project (unsafe)** - (or whatever you called your script).

Add your parameters to the config sheet - To see tips for competing each section hover over row titles

To add another alert go to **GA Realtime > Add new alert** from the menu.

To check your alerts will run successfully go to **GA Realtime > Check Alert Configurations**

To schedule your alerts go to **GA Realtime > Schedule Alerting** and selected a checking frequency

## Collecting anonymous usage data

We use Google Analytics to understand how many users/sheets are using this script and how often.  To do this, a random anonymous client ID is generated for each sheet and stored in script properties. No sensitive data about the user or spreadsheet will be sent to Google Analytics.  

To diable sending analytics data you can change the 'SEND_ANALYTICS_DATA' variable (line 15: Alerting.gs) to false. 

## Authors

* **Ed Guccione** - *Initial work* - @triweasel
* **Dan Gilbert** - *Initial work* - @dangilbertnow

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
