import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTesxtInput'
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be between 5-30 characters')
    .max(30, 'Username must be between 5-30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5-30 characters')
    .max(30, 'Password must be between 5-30 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        placeholderTextColor={theme.colors.mainBackground}
        style={styles.input}
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
        placeholderTextColor={theme.colors.mainBackground}
        secureTextEntry
        style={styles.input}
      />
      <FormikTextInput
        name='passwordConfirmation'
        placeholder='Password confirmation'
        placeholderTextColor={theme.colors.mainBackground}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontWeight='bold' style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signIn] = useSignIn()
  const [signUp] = useSignUp()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}
export default SignUp
