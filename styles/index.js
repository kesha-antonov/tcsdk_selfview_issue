import { Dimensions, StyleSheet } from 'react-native'
import colors from './colors'

const { height, width } = Dimensions.get('window')
export const screenHeight = height

export default StyleSheet.create({
  fill: {
    flex: 1,
  },
  fillDisabled: {
    flex: 0,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  fillByDimensions: {
    width: '100%',
    height: '100%',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    backgroundColor: colors.white,
  },
  contentWithHeader: {
    backgroundColor: colors.white,
    flex: 1,
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
  },
  rowContentRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  jSpaceBetween: {
    justifyContent: 'space-between',
  },
  aIFlexEnd: {
    alignItems: 'flex-end',
  },
  column: {
    flexDirection: 'column',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowStretchItems: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  rowTop: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
})
