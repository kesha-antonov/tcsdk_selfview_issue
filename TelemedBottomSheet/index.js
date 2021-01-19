import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import BottomSheet from 'reanimated-bottom-sheet'

function TelemedBottomSheet (props) {
  console.log('TelemedBottomSheet', props)
  // const {
  //   isCallActive,
  //   isCallHidden,
  // } = props

  const bottomSheetRef = useRef()
  const snapPoints = ['100%', 0]

  const [isOverlayActive, setIsOverlayActive] = useState(true)

  // useEffect(() => {
  //   if (!isCallHidden)
  //     setIsOverlayActive(true)
  //
  //   bottomSheetRef.current.snapTo(props.isCallHidden ? 1 : 0)
  // }, [isCallHidden])

  useEffect(() => {
    bottomSheetRef.current.snapTo(0)
  }, [])

  function renderContent () {
    return (
      <View style={styles.telemedBottomSheetContent}>
        {props.renderContent()}
      </View>
    )
  }

  function onOpenStart () {
    // setIsOverlayActive(true)
  }

  function onCloseEnd () {
    // setIsOverlayActive(false)
    // props.setIsCallHidden(true)
  }

  return (
    <View style={[StyleSheet.absoluteFill, !isOverlayActive && styles.telemedBottomSheetNotActive]}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnap={1}
        renderContent={renderContent}
        onOpenStart={onOpenStart}
        onCloseEnd={onCloseEnd}
      />
    </View>
  )
}


export default TelemedBottomSheet
