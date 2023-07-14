import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  appBarText: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
})

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.appBarText}>{text}</Text>
    </Pressable>
  )
}

export default AppBarTab
