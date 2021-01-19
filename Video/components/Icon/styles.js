import { StyleSheet } from 'react-native'

import colors from '../../../styles/colors'

export default StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 11,
    overflow: 'hidden',
    borderRadius: 25,
  },
  iconBg: {
    backgroundColor: colors.basedBlue,
  },
  iconNotActiveBg: {
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  iconContainerNotActive: {
    backgroundColor: colors.basedBlue,
  },
  bottomButtonIcon: {
    fontSize: 21,
    lineHeight: 20,
  },
})
