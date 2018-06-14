# ga-realtime-alerting
Google Apps Script to query Google Analytics Realtime API on a scheduled and send custom email alerts when user-defined metric thresholds are reached.

# Script setup guide 

Make a copy of the **script template (or copy scripts from GitHub)** and then go to **Tools > Script editor from the menu**.


<img src="https://lh5.googleusercontent.com/A3Sh4MxmLcU2kagFK6RniVzahCI15qL8BnT-36c5gCrllAfzQjhvijkVMDkoRWVpOOurvEux_pC7B2Wm9wCVl4Qeb68CLTxbEe4UbMDAnaaofbo8xhEcID3U5yVTVmvSM2vq6hqM">


Go to **Resources > Advanced Google services.**

![ScreenShot](https://lh3.googleusercontent.com/8PsiEn4304XjE0xPnoQGTaXeR3gEOk5dzPRaA75OySjR1PpYFpNEQV3FOpHK2AvUZJLBJTKPdPaFyhj_HgBl1oHPbegkbe5-HRNOQm9s19uXQgfmbh9YDweBTTO18wa8C1cGJxmi)

Turn on **Google Analytics API v3.**

<img src="https://lh3.googleusercontent.com/rH7aJGl5_IaS1mXX2TE41X8OoLKktDB9PzhOHwM3lJG71gVGe04xw7M5iFsGRgwQvRHpKw4MlSbthFOQyeUKlk9N5uhMlyl9xTzn_0T_9wU2BPCw3fa-tRuJFoImQN4nLyFaHNOf" width="366">

Click the link to **Google Developers Console**.

![ScreenShot](https://lh3.googleusercontent.com/1oONHd4feSkJRJcErb1Xj1ayfWAdiYTc3bQW9Mab3W0PeLOQ0RFWU3bYSVadOin4dycMMGCAfZ_2HUSWX5ucfLVaroSGcXV4d7umZO-wIdM5V36Znov0Qvw_QoMDTszEA91Kqsod)

The **Developers Console** will open in a new tab.

<img src="https://lh5.googleusercontent.com/2hJXSmbqkv1fxcLyuSDBllXQJhDWd7J2O5wjTD3dR_sgHr2ND0oLa57hqoE2iU8WMlqI0XOv7O-D4e1OZ3WAqvVyq84nOZFuijHYmem7D-bzNiH3Mp9LPygaAy5jT6F1Xybz_L0b" width="602">


Search for and select the **Analytics API**

<img src="https://lh4.googleusercontent.com/VMgtoGNhSifjFpxZHvN8pqyG73mtq-TyO5ZayRCeV1F42_R2_l0cJ682fE3kggWKtRA1oy4nHzXiXblFy15FTR_OWIZvMqC6KDOcq98REkg42zN0L1jvtYbYjSxgt0_4jkmphTcB" width="400">

**Enable** the API and close the **Developers Console** tab.

<img src="https://lh5.googleusercontent.com/wuKt8Y9rZixMl6DC4haS5zdU50UJb__jZCHN8eGoQG6pkrm7zxW2b066CtJl0py1ooOv_KyMbnYnyghwV4z8OEFKzQUVV-RZnRxfKIrI1P_GvGEXq9NEDifiEbnmaUXsx4RhpZDk" width="400">

Click **Okay** to close the **Advanced Google Services** dialog box.

<img src="https://lh3.googleusercontent.com/rH7aJGl5_IaS1mXX2TE41X8OoLKktDB9PzhOHwM3lJG71gVGe04xw7M5iFsGRgwQvRHpKw4MlSbthFOQyeUKlk9N5uhMlyl9xTzn_0T_9wU2BPCw3fa-tRuJFoImQN4nLyFaHNOf" width="332">

An **updating settings** message will display at the top of the screen.

![ScreenShot](https://lh3.googleusercontent.com/-bNi5yT9mcawa1yQq86XzSc34HCMMbqKkPtrKnbSFSLJriNJ3p7j35Q6bId5jzUgnGm5wmWEJN_zZOanH_DsdYypDxDSTo6BA-R2yjwcd8vPdsBzUhdXQlAHMX_MxNtb80HVpU5F)

The script is now setup and you can close the Script Editor tab.

#Create Alerts

Refresh the browser - This generates the App menus 

Go to **GA Realtime > Create Configuration Sheet** in the menu

The first time you run the script you will be prompted to grant some permissions.

<img src="https://lh6.googleusercontent.com/SnJS_fUHz-uRhcwxhY4PYGPT861dq5nF67YnM0hHW2Laq1hdFMGxekGvXfvbP-wYgwsd7ngQTGR1lfh-ZR9AllzNP7TgsGczahyKSJzAAOOvYA8iJnXviEJ8ShgPMV4VbpQHORHb" width="332">

Select **Continue** and **Allow** permissions in the next window.  

<img src="https://lh6.googleusercontent.com/xuXAwWA0OXPAg1pEbxoVqgAlgT4vMd6frbeFP4o4j6JgjpY6cOu29qWeuYeJuKZFICxqWY3f9EQqGH2ZctJq1McWa8CoSrka8_7Zv6PPLwBbe1uV-CuO7i5m_2AGrvl-QII-GlkS" width="332">
This is a standard alert/warning as the app script can access your GA data and the Google Sheet. 

Click **Advanced**.

<img src="https://lh6.googleusercontent.com/7yvj6PYYY6CejcHJzHrrsKG91ZcWrZMxFVeFoZCS_GLYJlBsVcWeTbdWZISvZ2aEP_kQWbKL0L6qnHoSkEfXF3fL07dFqFxNxy6aXBI5Jba3iV20zIqf_tc2pCamorG3ABubh6_9" width="332">

Click Go to **GA Realtime Alerting Script v3 Master** (unsafe).

Add your parameters to the config sheet - To see tips for competing each section hover over row titles

To add another alert go to **GA Realtime > Add new alert** from the menu.

To check your alerts will run successfully go to **GA Realtime > Check Alert Configurations**

To schedule your alerts go to **GA Realtime > Schedule Alerting** and selected a checking frequency
