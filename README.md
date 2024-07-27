<p align="center">
  <a aria-label="Ios" href="npmjs.com/package/expo" target="_blank">
    <img alt="IOS" src="https://img.shields.io/badge/iOS-999999.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)" />
  </a>
  <a aria-label="supports Android" href="https://chat.expo.dev" target="_blank">
    <img alt="supports Android" src="https://img.shields.io/badge/Android-A4C639.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
</p>


# Smart Socket Controller

<img
  src="docs/socket_screen_shot.png"
  alt="Alt text"
  title="Optional title"
  style="margin:0 4px; max-width: 500px"
/>



A React Native application that leverages Bluetooth Low Energy (BLE) to communicate with an ESP HUB controller for data receiving and exchange


Take full control of your home’s energy consumption with the Smart Socket Controller app. This innovative app allows you to effortlessly manage and monitor your smart sockets from anywhere, ensuring efficient energy use and significant cost savings.


## Technologies Used to Develop the Smart Socket Controller App 

### Mobile App Development: 
- React Native:  For building the cross-platform mobile app for both iOS and Android.
- Visily:  For designing the user interface.


### Communication Protocols: 
- MQTT: For real-time communication between the app and the smart sockets.
- ESP-NOW: For low-latency communication between the central hub and the socket nodes.
- Wi-Fi: For connecting the hub to the internet and sending data to ThingSpeak.
- Bluetooth (BLE): For local communication between the central hub and the mobile app.

### Hardware: 
- ESP32 Micro-controllers: For the central hub and socket nodes.
- PZEM-004T: For energy monitoring and data collection from the sockets.
- PC817 and BC547: For controlling and switching socket power.

### Cloud and Data Analytics: 
- ThingSpeak: For data storage and initial data analysis.
- Google Colab: For developing machine learning models to predict energy usage.


## Key Features: 

 ⁠-  Remote Control: Turn your appliances on or off remotely using your smartphone. No more worrying about leaving devices on when you’re away from home.

 ⁠- Real-Time Monitoring: Keep track of the power usage of each socket in real-time. Get detailed insights into your energy consumption patterns.

 ⁠- Scheduling: Set schedules for your appliances to automatically turn on or off at specific times, optimizing your energy usage and reducing waste.

 ⁠- Alerts and Notifications:* Receive alerts and notifications for abnormal power consumption, helping you identify and address potential issues promptly.

 ⁠- Usage Reports:  Access comprehensive usage reports to understand your energy consumption better. Make informed decisions to enhance energy efficiency.

 ⁠- User-Friendly Interface:* Enjoy a sleek and intuitive interface that makes controlling and monitoring your smart sockets a breeze.



The Smart Socket Controller app is your go-to solution for a smarter, more efficient home. Take charge of your energy use and start saving today!



## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```
## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
