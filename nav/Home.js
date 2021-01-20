import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

function Home () {
  return (
    <View style={{flex: 1}}>
      <Text>{'Home'}</Text>
    </View>
  )
}


export default withMappedNavigationParams()(Home)
