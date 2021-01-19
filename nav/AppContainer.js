import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        getComponent={() => require('../TelemedBottomSheet/scene').default}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
