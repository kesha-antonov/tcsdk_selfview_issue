import React from 'react'
import {
  View,
  ViewPropTypes,
  Platform,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native'
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

import IonIcon from 'react-native-vector-icons/Ionicons'

import commonStyles from '../../../styles'
import colors from '../../../styles/colors'
import styles from './styles'

// NOTE: "react-native-gesture-handler"'s TOUCHABLES WORK ONLY IN ANDROID WHEN
// IN reanimated-bottom-sheet
const TouchableOpacity = Platform.select({
  ios: RNTouchableOpacity,
  android: GHTouchableOpacity,
})

function Icon (props) {
  const {
    isIconActive,
    name,
    bgStyle,
    iconStyle,
    onPress,
  } = props

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={onPress}
    >
      <View
        style={[
          commonStyles.fill,
          commonStyles.center,
        ]}
      >
        <View
          style={[
            commonStyles.absoluteFill,
            styles.iconBg,
            bgStyle,
            !isIconActive && styles.iconNotActiveBg,
          ]}
        />
        <IonIcon
          name={name}
          color={colors.white}
          style={[styles.bottomButtonIcon, iconStyle]}
        />
      </View>
    </TouchableOpacity>
  )
}
Icon.defaultProps = {
  isIconActive: true,
}
Icon.proptypes = {
  isIconActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  bgStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
}

export default Icon
