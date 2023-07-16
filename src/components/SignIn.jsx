import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTesxtInput'
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'stretch',
    padding: 7,
  },
  input: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    placeholderTextColor: theme.colors.mainBackground,
    height: 45,
    margin: 7,
    padding: 14,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    borderRadius: 3,
    height: 45,
    margin: 7,
  },
  buttonText: {
    color: 'white',
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        style={styles.input}
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontWeight='bold' style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async values => {
    const {username, password} = values

    try {
      const {data} = await signIn({username, password})
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
export default SignIn
