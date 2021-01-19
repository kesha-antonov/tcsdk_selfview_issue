import { StyleSheet } from 'react-native'
import { TinyColor } from '@ctrl/tinycolor'

import colors from '../styles/colors'
import { screenHeight } from '../styles'

export default StyleSheet.create({
  callBg: {
    backgroundColor: new TinyColor(colors.black).setAlpha(0.7).toRgbString(),
  },
  bottomInfo: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    minHeight: screenHeight / 5,
    paddingTop: 30,
  },
  bottomInfoBg: {
    opacity: 0.5,
  },
  callTimeText: {
    marginTop: 10,
  },
  buttonsContainer: {
    paddingTop: 60,
  },
  loadingContent: {
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,.15)',
  },
  loadingSpinner: {
    marginRight: 20,
    marginTop: -7,
  },
  loadingText: {
    textAlign: 'center',
    color: colors.white,
  },
  iconHangup: {
    backgroundColor: colors.redBrick,
  },
  iconMicrophone: {
    lineHeight: 24,
    fontSize: 24,
  },
  iconMicrophoneMuted: {
    lineHeight: 25,
    fontSize: 25,
  },
  iconCamera: {
    lineHeight: 24,
    fontSize: 24,
  },
  iconCameraOff: {
    lineHeight: 25,
    fontSize: 25,
  },
})
