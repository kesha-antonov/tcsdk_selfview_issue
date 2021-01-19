
import { NativeModules, NativeEventEmitter } from 'react-native';

let sdk = NativeModules.RNTrueConfSdk;
let listener = new NativeEventEmitter(sdk);

let listenEvents = [];

const eventsList = [
    "onServerStatus",
    "onLogin",
    "onLogout",
    "onServerStateChanged",
    "onConferenceStart",
    "onConferenceEnd",
    "onInvite",
    "onRecordRequest",
    "onAccept",
    "onReject",
    "onRejectTimeout",
    "onUserStatusUpdate",
    "onChatMessageReceived",
    "onExtraButtonPressed"
];

export default class TrueConfSDK {

    /**
     * Add listener to some sdk event
     * @param {string} name - The name of event
     * @param {function} handler - The function for handling event
     */
    static addEventListener(name, handler) {
        if(!eventsList.includes(name)) {
            return;
        }
        if(listener === undefined) {
            listener = new NativeEventEmitter(sdk);
        }
        listener.addListener(name, handler);
        listenEvents.push(name);
    }

    /**
     * Get list of available events
     * @returns {string[]} - The list of available events for handling
     */
    static get EventsList() {
        return eventsList;
    }

    /**
     * Remove all listeners from some sdk event or clear all events listeners
     * @param {string} name - The name of event, optional
     */
    static removeAllListeners(name) {
        if(name === undefined) {
            for(let i = 0; i < listenEvents.length; i++) {
                listener.removeAllListeners(listenEvents[i]);
            }
            listenEvents = [];
            listener = undefined;
        }
        else {
            listener.removeAllListeners(name);
            listenEvents.splice(listenEvents.indexOf(name));
        }
    }

    /**
     * Start the SDK. Servers list can be empty, sdk connects to the TrueConf Online by default)
     * @param {string} serversList - The servers list which will be used to search for working server to connect to it, optional
     */
    static start(serversList) {
        sdk.start(serversList);
    }

    /**
     * Stop the SDK
     */
    static stop() {
        sdk.stop();
    }

    /**
    * Add custom button
    * @param {string} title - The button title
    * @param {string} drowableResourceName - The drowable resource name for button (can be empty)
    * @param {string} textColorString - The color of button text in format "#AARRGGBB" or "#RRGGBB" or color name (like a "blue" or "plum") in html range (can be empty)
    * @param {boolean} isActive - The flag means button is active
    * @returns {Promise} - A promise to be called after adding extra button.
    */
    static addExtraButton(title, drowableResourceName, textColorString, isActive) {
        return sdk.addExtraButton(title, drowableResourceName, textColorString, isActive);
    }

    /**
    * Show alert page on call page
    * @param {string} alertText - The text for displaying in alert page
    */
    static showAlertPage(alertText) {
        sdk.showAlertPage(alertText);
    }

    /**
     * Login on the server
     * @param {string} user - The user id
     * @param {string} password - The user password
     * @param {boolean} encryptPassword - “true” if password is a plane unencrypted string (and SDK will need to encrypt it), “false” if password string is already encrypted
     * @param {boolean} enableAutoLogin - “true” if you want this user to be logged in automatically next time SDK will be initialized
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static loginAs(user, password, encryptPassword, enableAutoLogin) {
        return sdk.loginAs(user, password, encryptPassword, enableAutoLogin);
    }

    /**
     * Login on the server
     * @param {string} user - The user id
     * @param {string} password - The user password
     * @param {boolean} encryptPassword - “true” if password is a plane unencrypted string (and SDK will need to encrypt it), “false” if password string is already encrypted
     * @param {boolean} enableAutoLogin - “true” if you want this user to be logged in automatically next time SDK will be initialized
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static loginAs(user, password, encryptPassword, enableAutoLogin) {
        return sdk.loginAs(user, password, encryptPassword, enableAutoLogin);
    }

    /**
     * Logout on the server
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static logout() {
        return sdk.logout();
    }

    /**
     * Call to the user by id
     * @param {string} callToUser - The user id to call
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static callTo(callToUser) {
        return sdk.callTo(callToUser);
    }

    /**
     * Join the existed conference
     * @param {string} confId - The conference id to join
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static joinConf(confId) {
        return sdk.joinConf(confId);
    }

    /**
     * End the call or the conference
     * @param {boolean} forAll
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static hangup(forAll) {
        return sdk.hangup(forAll);
    }

    /**
     * Accept or reject incoming call or invitation
     * @param {boolean} accept - "true" for accepting, "false" for rejecting
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static acceptCall(accept) {
        return sdk.acceptCall(accept);
    }

    /**
     * Accept video record request
     * @param {boolean} accept - "true" if accept, "false" if reject.
     * @param {string} userID - user ID to whom the response to the request is sent.
     * @returns {Promise.<boolean>} - A promise to be called after accepting the video record request.
     */
    static acceptRecord(accept, userID) {
        return sdk.acceptRecord(accept, userID);
    }

    /**
     * Send chat message
     * @param {string} userID - The user id
     * @param {string} message - The text message
     * @returns {Promise.<boolean>} - The promise with the result of command execution
     */
    static sendChatMessage(userID, message) {
        return sdk.sendChatMessage(userID, message);
    }

    /**
     * Using this one method with only one parameter you can schedule a lot of actions one after another: 
     * connecting to server, login with specified user, call to another user, join group conference etc.
     * In one string parameter you can describe all this actions using special syntax (similar to URL). 
     * All this actions performed automatically one after another and in case of error on some step SDK just will stop at the achieved level.
     * @param {string} cmd - The specially formatted string with commands
     */
    static parseProtocolLink(cmd) {
        sdk.parseProtocolLink(cmd);
    }

    /**
     * This method is similar to parseProtocolLink but all actions specified as individual parameters
     * @param {string} login - The user id
     * @param {string} pwd - The user password
     * @param {boolean} encryptPassword - “true” if password is a plane unencrypted string (and SDK will need to encrypt it), “false” if password string is already encrypted
     * @param {string} callToUser - The user id to call
     * @param {boolean} autoClose - “true” to automatically close server session after call ends or something went wrong
     * @param {boolean} loginTemp - Specified in “login” parameter user is temporary. It means that logout will be performed automatically after call ends
     * @param {boolean} loginForce - Forced login. Authorization with specified user login will be performed even if SDK already authorized on specified server with another user
     * @param {string} domain - Server will be automatically searched in this domain
     * @param {string} serversList -  The servers list which will be used to search for working server to connect to it
     * @param {boolean} isPublic - "true” if parameter “callToUser” is a conference name (not user identifier). Call of join will fail if you specify incorrect value in this parameter
     */
    static scheduleLoginAs(login, pwd, encryptPassword, callToUser, autoClose, loginTemp, loginForce, domain, serversList, isPublic) {
        sdk.scheduleLoginAs(login, pwd, encryptPassword, callToUser, autoClose, loginTemp, loginForce, domain, serversList, isPublic);
    }

    /**
     * Mute or unmute the microphone
     * @param {boolean} mute - "true" for muting microphone, "false" for unmuting it
     */
    static muteMicrophone(mute) {
        sdk.muteMicrophone(mute);
    }

    /**
     * Mute or unmute the camera
     * @param {boolean} mute - "true" for muting camera, "false" for unmuting it
     */
    static muteCamera(mute) {
        sdk.muteCamera(mute);
    }

    /**
     * Get current user id
     * @returns {Promise.<string>} - The promise with the current user id as parameter
     */
    static getMyId() {
        return sdk.getMyId();
    }

    /**
     * Get current user name
     * @returns {Promise.<string>} - The promise with the current user name as parameter
     */
    static getMyName() {
        return sdk.getMyName();
    }

    /**
     * Checks that sdk is started now
     * @returns {Promise.<boolean>} - The promise with the checking result as parameter
     */
    static isStarted() {
        return sdk.isStarted();
    }

    /**
     * Checks current connection to server status
     * @returns {Promise.<boolean>} - The promise with the checking result as parameter
     */
    static isConnectedToServer() {
        return sdk.isConnectedToServer();
    }

    /**
     * Checks your current authorization status
     * @returns {Promise.<boolean>} - The promise with the checking result as parameter
     */
    static isLoggedIn() {
        return sdk.isLoggedIn();
    }

    /**
     * Checks that you are in conference now (group or 1x1)
     * @returns {Promise.<boolean>} - The promise with the checking result as parameter
     */
    static isInConference() {
        return sdk.isInConference();
    }

    /**
     * Returns status of any specified user. Statuses descriptions are in the SDK documentation
     * @param {string} user - The user id
     * @returns {Promise.<number>} - The promise with the user status as parameter
     */
    static getUserStatus(user) {
        return sdk.getUserStatus(user);
    }

    /**
     * Get the microphone muting state
     * @returns {Promise.<boolean>} - The promise with the microphone muting state as parameter
     */
    static microphoneMuted() {
        return sdk.microphoneMuted();
    }

    /**
     * Get the camera muting state
     * @returns {Promise.<boolean>} - The promise with the camera muting state as parameter
     */
    static cameraMuted() {
        return sdk.cameraMuted();
    }
}
