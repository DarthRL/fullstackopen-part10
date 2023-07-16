import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/queries'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } })
    return result
  }

  return [signIn, result]
}

export default useSignIn
