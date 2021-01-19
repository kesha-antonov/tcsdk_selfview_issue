/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Video from './Video'

const App: () => React$Node = () => {
  const [isCallActive, setIsCallActive] = useState(true)



  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        {
          isCallActive ? (
            <Video onHangup={() => setIsCallActive(false)} />
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
