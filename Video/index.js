import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  InteractionManager,
  Text,
  Platform,
} from 'react-native'
import TrueConfSDK from 'react-native-trueconf-sdk'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spinner from 'react-native-spinkit'
import nextFrame from './nextFrame'
import Icon from './components/Icon'

import commonStyles from '../styles'
import colors from '../styles/colors'
import styles from './styles'

const IS_IOS = Platform.OS === 'ios'
const IS_ANDROID = Platform.OS === 'android'

if (IS_IOS)
  var TrueConfWrapper = require('react-native-trueconf-react-sdk').default

function Video (props) {
  async function initSdkIos () {
    await new Promise(resolve => InteractionManager.runAfterInteractions(resolve))
    trueconfRef.current.initSdk()
  }

  function initSdkAndroid () {
    console.log('initSdk: android', server)
    TrueConfSDK.addEventListener('onServerStatus', onServerStatus)
    TrueConfSDK.addEventListener('onStateChanged', onStateChanged)
    TrueConfSDK.addEventListener('onLogin', onLogin)
    TrueConfSDK.addEventListener('onLogout', onLogout)
    TrueConfSDK.addEventListener('onAccept', onAccept)
    TrueConfSDK.addEventListener('onInvite', onInvite)
    TrueConfSDK.addEventListener('onReject', onReject)
    TrueConfSDK.addEventListener('onRejectTimeout', onRejectTimeout)
    TrueConfSDK.addEventListener('onConferenceStart', onConferenceStart)
    TrueConfSDK.addEventListener('onConferenceEnd', onConferenceEnd)
    TrueConfSDK.addEventListener('onUserStatusUpdate', onUserStatusUpdate)
    TrueConfSDK.start(server)
  }

  async function initSdk () {
    await new Promise(resolve => setTimeout(resolve, 700))

    if (IS_IOS) {
      initSdkIos()
      return
    }

    initSdkAndroid()
  }

  function onServerStatus (e) {
    console.log('onServerStatus', e, e.nativeEvent)

    if (!IS_ANDROID) return

    const isConnectedToServer = e.connected
    setIsConnectedToServer(isConnectedToServer)
    setIsConnectingToServer(!isConnectedToServer)

    if (isConnectedToServer && !isLoggedIn) login()
  }

  function onStateChanged (e) {
    // e
    // isStarted,
    // isInConference,
    // isCameraMuted,
    // isMicrophoneMuted,

    const { nativeEvent } = e

    console.log('onStateChanged', nativeEvent, isLoggedIn, isConnectedToServer)
    if (nativeEvent.isConnectedToServer !== isConnectedToServer) {
      console.log('onStateChanged-1')
      const isConnectedToServer = nativeEvent.isConnectedToServer
      setIsConnectedToServer(isConnectedToServer)
      setIsConnectingToServer(!isConnectedToServer)
    }

    if (!nativeEvent.isConnectedToServer) return

    if (nativeEvent.isLoggedIn !== isLoggedIn) {
      console.log('onStateChanged-2')
      setIsLoggedIn(nativeEvent.isLoggedIn)
      if (IS_IOS)
        onLogin({
          isLoggedIn: nativeEvent.isLoggedIn,
          userId,
        })
    }

    if (typeof nativeEvent.isInConference !== 'undefined')
      if (!isInConference.current && nativeEvent.isInConference) {
        isInConference.current = true
        onConferenceStart()
      } else if (isInConference.current && !nativeEvent.isInConference) {
        isInConference.current = false
        onConferenceEnd()
      }

    if (nativeEvent.isLoggedIn) return
    if (nativeEvent.isLoggingIn) return
    login()
  }

  function onUserStatusUpdate (e) {
    console.log('onUserStatusUpdate', e, e && e.nativeEvent)

    if (!IS_ANDROID) return
    if (e.state >= 2) return
    if (!isCalling) return

    console.log('recipient user')
    setIsCalling(false)
    setIsCallActive(false)
  }

  function login () {
    setIsLoggingIn(true)
    console.log('login', userId, userPassword)

    if (IS_IOS) {
      trueconfRef.current.login({
        userId,
        password: userPassword,
        encryptPassword: true,
        enableAutoLogin: true,
      })
      return
    }

    TrueConfSDK.loginAs(
      userId,
      userPassword,
      true,
      true
    )
  }

  function onLogin (e) {
    console.log('onLogin', e)
    let isLoggedIn,
      userId

    if (IS_IOS) {
      ({ isLoggedIn, userId } = e)
    } else {
      isLoggedIn = e.loggedIn
      userId = e.userID
    }
    if (!userId) return

    setIsLoggedIn(isLoggedIn)
    if (!isLoggedIn) return

    tryCall()
  }

  function tryCall () {
    console.log('tryCall', isCalling)
    if (isCalling) return

    makeCall()
  }

  function joinConf () {
    console.log('joinConf', conferenceId)
    let joinConf
    if (IS_IOS)
      ({ joinConf } = trueconfRef.current)
    else
      ({ joinConf } = TrueConfSDK)

    joinConf(conferenceId)
  }

  function makeCall () {
    console.log('makeCall')
    joinConf()
  }

  function hangup () {
    console.log('hangup')
    setIsCalling(false)

    const hangupForAll = false
    let hangup
    if (IS_IOS)
      ({ hangup } = trueconfRef.current)
    else
      ({ hangup } = TrueConfSDK)

    hangup(hangupForAll)

    setIsCallActive(false)

    setTimeout(props.onHangup, 250)
  }

  async function toggleMute () {
    await nextFrame()
    setIsMuted(!isMuted)
  }

  async function toggleCameraOn () {
    await nextFrame()
    setIsCameraOn(!isCameraOn)
  }

  function onConferenceStart (e) {
    console.log('onConferenceStart', e && e.nativeEvent)
    // NOTE: SKIP EVENT ON IOS SINCE IT FIRES ON CALL START NOT ON CALL ACCEPT
    if (IS_IOS && !!e) return
  }

  function onConferenceEnd (e) {
    console.log('onConferenceEnd', e && e.nativeEvent)
    if (IS_IOS && !!e) return

    hangup()
  }

  function onLogout (e) {
    console.log('onLogout', e && e.nativeEvent)
  }

  function onAccept (e) {
    console.log('onAccept', e && e.nativeEvent)
  }

  function onInvite (e) {
    console.log('onInvite', e && e.nativeEvent)
  }

  function onReject (e) {
    console.log('onReject', e && e.nativeEvent)
  }

  function onRejectTimeout (e) {
    console.log('onRejectTimeout', e && e.nativeEvent)
  }

  function renderBottomButtons () {
    return (
      <View style={[commonStyles.row, commonStyles.center, styles.buttonsContainer]}>
        {
          isActive && (
            <>
              <Icon
                name={isMuted ? 'mic-off-outline' : 'mic-outline'}
                isIconActive={!isMuted}
                onPress={toggleMute}
                iconStyle={[styles.iconMicrophone, isMuted && styles.iconMicrophoneMuted]}
              />
              <Icon
                name={isCameraOn ? 'videocam-outline' : 'videocam-off-outline'}
                isIconActive={isCameraOn}
                onPress={toggleCameraOn}
                iconStyle={[styles.iconCamera, !isCameraOn && styles.iconCameraOff]}
              />
            </>
          )
        }
        <Icon
          name='call-outline'
          onPress={hangup}
          bgStyle={styles.iconHangup}
        />
      </View>
    )
  }

  const [isCallActive, setIsCallActive] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)

  const [isConnectingToServer, setIsConnectingToServer] = useState(true)
  const [isConnectedToServer, setIsConnectedToServer] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const isInConference = useRef(false)

  const trueconfRef = useRef()

  const isActive = isConnectedToServer && isLoggedIn

  const insets = useSafeAreaInsets()

  const server = 'videoconf.mediadoc.fr'
  const userId = '749fda90c2414082a6ece8e9d89fbf4a'
  const userPassword = '223a82395b393b5bfdeb30d189e32bb9'
  const conferenceId = '2d0829092932453d8064f4da499e9bd4'

  useEffect(() => {
    initSdk()

    return async function cleanup () {
      if (IS_IOS) {
        trueconfRef.current.stopSdk()
        return
      }

      TrueConfSDK.removeAllListeners()
      await TrueConfSDK.logout()
      TrueConfSDK.stop()
    }
  }, [])

  console.log('video render', server, userId, userPassword, conferenceId)

  return (
    <View style={[commonStyles.fill, commonStyles.whiteBackground]}>
      <View style={[commonStyles.absoluteFill, styles.callBg]} />
      {
        IS_IOS &&
          <TrueConfWrapper
            ref={trueconfRef}
            style={[commonStyles.fill, commonStyles.absoluteFill]}

            server={server}
            muted={isMuted}
            cameraOn={isCameraOn}

            onServerStatus={onServerStatus}
            onStateChanged={onStateChanged}
            onLogin={onLogin}
            onLogout={onLogout}
            onAccept={onAccept}
            onInvite={onInvite}
            onReject={onReject}
            onRejectTimeout={onRejectTimeout}
            onConferenceStart={onConferenceStart}
            onConferenceEnd={onConferenceEnd}
            onUserStatusUpdate={onUserStatusUpdate}
          />
      }
      {
        !isActive && (
          <View style={[commonStyles.fill, commonStyles.center]}>
            <View style={[commonStyles.rowCenter, styles.loadingContent]}>
              <Spinner
                isVisible
                size={20}
                type='FadingCircleAlt'
                color={colors.white}
                style={styles.loadingSpinner}
              />
              {
                isLoggingIn && !isLoggedIn
                  ? (
                    <Text style={styles.loadingText}>
                      {'authorizing...'}
                    </Text>)
                  : isConnectingToServer && !isConnectedToServer
                    ? (
                      <Text style={styles.loadingText}>
                        {'connecting...'}
                      </Text>
                    )
                    : null
              }
            </View>
          </View>
        )
      }
      <View
        style={[
          commonStyles.column,
          commonStyles.fullWidth,
          styles.bottomInfo,
          { paddingBottom: 55 + insets.bottom },
        ]}
      >
        {renderBottomButtons()}
      </View>
    </View>
  )
}

export default Video
