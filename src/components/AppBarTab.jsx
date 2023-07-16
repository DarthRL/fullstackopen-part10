import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../theme'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  appBarText: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
})

const AppBarTab = ({ text, to, ...props }) => {
  return (
    <Pressable>
      <Link to={to} {...props}>
        <Text style={styles.appBarText}>{text}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
