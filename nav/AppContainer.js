import { createSwitchNavigator, createAppContainer } from 'react-navigation'

const switchNavigation = createSwitchNavigator(
  {
    MainStack: {
      getScreen: () => require('../TelemedBottomSheet/scene').default,
      navigationOptions: {
        headerShown: false,
      },
    },
  }
)

const AppContainer = createAppContainer(switchNavigation)

export default AppContainer
