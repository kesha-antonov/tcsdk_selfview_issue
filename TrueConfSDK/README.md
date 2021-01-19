
# react-native-true-conf-sdk

## Getting started

Run command from the your project folder:

`$ yarn add pathToTrueConfSDKModuleFolder`
E.g.: `$ yarn add ../TrueConfSDK` for our Example1

### Mostly automatic installation

`$ react-native link react-native-trueconf-sdk`

####Extra steps iOS:
1. Add the TrueConfSDK.framework from node_modules/react-native-trueconf-sdk/ios to embedded binaries: 
  - In XCode, open the base target (Example1 in our example) ➜ in the `General` tab of target settings click `+` button in the `Embedded binaries` section ➜ go to the node_modules/react-native-trueconf-sdk/ios folder and select the TrueConfSDK.framework ➜ click the `Finish` button
2. Add the framework search paths to the project settings:
  - In XCode, open the base project (Example1 in our example) ➜ in the Build setting tab of the base project settings , in the `Search Paths` section, add path `$(SRCROOT)/../node_modules/react-native-trueconf-sdk/ios` to the  `Framework Search Paths`
3. Add the camera and microphone usage descriptions string to info plist:
  - In XCode, in the project navigator, open the Info.plist file ➜ click the `+` button near the `Properties Info List` ➜ select the `Privacy - Camera Usage Description` from dropdown list ➜ enter some camera usage description string
  - Click the `+` near the `Properties Info List` again ➜ select the `Privacy - Microphone Usage Description` from dropdown list ➜ enter some microphone usage description string
	
####Extra steps Android:
1. Add the TrueConfSDK.aar from node_modules/react-native-trueconf-sdk/android to project as module: 
  - In Android Studio, in the project navigator, right click the project ➜ click the `Open Module Settings` ➜ click the `+` in the top of modules list ➜ click `New module` and select `Import .JAR/.AAR Package` in the Android tab ➜ go to the node_modules/react-native-trueconf-sdk/android folder and select the TrueConfSDK.aar ➜ click `Open` button then click the `Finish` button
2. Set the minSdkVersion to 17 (required for TrueConf Android SDK):
  - In Android Studio, in the project navigator, open the build.gradle for a base project (Example1 for our example) ➜ in `buildscript`, in the `ext`, edit `minSdkVersion` ➜ enter 17 or higher, save changes and Sync project with gradle files


### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-true-conf-sdk` and add `RNTrueConfSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNTrueConfSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Take 3 steps from the `Additional steps iOS` in the `Automatic installation`
5. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.trueconf.RNTrueConfSdkPackage;` to the imports at the top of the file
  - Add `new RNTrueConfSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-trueconf-sdk'
  	project(':react-native-trueconf-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-trueconf-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':react-native-trueconf-sdk')
  	```
4. Take 2 steps from the `Additional steps Android` in the `Automatic installation`

#### Additional steps iOS


## Usage
```javascript
import {..., NativeEventEmitter } from 'react-native';
import TrueConfSDK from 'react-native-trueconf-sdk';

//methods

TrueConfSDK.start(serversList); //serversList optional
TrueConfSDK.stop();
TrueConfSDK.loginAs(user, password, encryptPassword, enableAutoLogin).then(...); //return Promise.<boolean>
TrueConfSDK.logout().then(...); //return Promise.<boolean>
TrueConfSDK.callTo(user).then(...); //return Promise.<boolean>
TrueConfSDK.joinConf(confId).then(...); //return Promise.<boolean>
TrueConfSDK.hangup().then(...); //return Promise.<boolean>
TrueConfSDK.acceptCall(accept).then(...); //return Promise.<boolean>
TrueConfSDK.parseProtocolLink(cmd);
TrueConfSDK.scheduleLoginAs(login, pwd, ecryptPassword, callToUser, autoClose, loginTemp, loginForce, domain, serversList, isPublic);
TrueConfSDK.muteMicrophone(mute);
TrueConfSDK.muteCamera(mute);
TrueConfSDK.getMyId().then(...); //return Promise.<string>
TrueConfSDK.getMyName().then(...); //return Promise.<string>
TrueConfSDK.isStarted().then(...); //return Promise.<boolean>
TrueConfSDK.isConnectedToServer().then(...); //return Promise.<boolean>
TrueConfSDK.isLoggedIn().then(...); //return Promise.<boolean>
TrueConfSDK.isInConference().then(...); //return Promise.<boolean>
TrueConfSDK.getUserStatus(user).then(...); //return Promise.<number>, descriptions of statuses are in SDK documentation
TrueConfSDK.microphoneMuted().then(...); //return Promise.<boolean>
TrueConfSDK.cameraMuted().then(...); //return Promise.<boolean>


//events

TrueConfSDK.addEventListener("onServerStatus", (connected, serverName, serverPort) => {...});
TrueConfSDK.addEventListener("onLogin", (loggedIn, userId) => {...});
TrueConfSDK.addEventListener("onLogout", () => {...});
TrueConfSDK.addEventListener("onServerStateChanged", () => {...});
TrueConfSDK.addEventListener("onConferenceStart", () => {...});
TrueConfSDK.addEventListener("onConferenceEnd", () => {...});
TrueConfSDK.addEventListener("onInvite", (userId, userName) => {...});
TrueConfSDK.addEventListener("onAccept", (userId, userName) => {...});
TrueConfSDK.addEventListener("onReject", (userId, userName) => {...});
TrueConfSDK.addEventListener("onRejectTimeout", (userId, userName) => {...});
TrueConfSDK.addEventListener("onUserStatusUpdate", (userId, status) => {...});
```
All available commands and events you can find in official SDK documentation. Also we hope that tips by JSDoc could be helpful.
  
