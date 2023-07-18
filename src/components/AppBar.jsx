import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const me = useQuery(ME)
  const [signOut] = useSignOut()

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab text={'Repositories'} to={'/'} />
        {me.data && me.data.me && (
          <AppBarTab text={'Create Review'} to={'/create_review'} />
        )}
        {me.data && me.data.me && (
          <AppBarTab text={'My Reviews'} to={'/my_reviews'} />
        )}
        {me.data && me.data.me && (
          <AppBarTab
            text={'Sign out'}
            to={'/'}
            onPress={async () => {
              await signOut()
            }}
          />
        )}
        {(!me.data || !me.data.me) && (
          <AppBarTab text={'Sign in'} to={'/signin'} />
        )}
        {(!me.data || !me.data.me) && (
          <AppBarTab text={'Sign up'} to={'/signup'} />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
