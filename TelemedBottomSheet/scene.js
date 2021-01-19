import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import Video from '../Video'
import TelemedBottomSheet from './index'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

function Scene () {
  const [isCallActive, setIsCallActive] = useState(true)

  return (
    <View style={{flex: 1}}>
      {
        isCallActive ? (
          <TelemedBottomSheet
            renderContent={() => (<Video onHangup={() => setIsCallActive(false)} />)}
          />
        ) : (
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setIsCallActive(true)}>
              <View style={{padding: 20, backgroundColor: 'green', borderRadius: 10}}>
                <Text style={{color: 'white', fontSize: 20}}>
                  {'Начать звонок'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}


export default withMappedNavigationParams()(Scene)
