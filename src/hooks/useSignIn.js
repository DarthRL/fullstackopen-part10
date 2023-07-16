import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/queries'
import { useAuthStorage } from '../contexts/AuthStorageContext'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }

  return [signIn, result]
}

export default useSignIn
