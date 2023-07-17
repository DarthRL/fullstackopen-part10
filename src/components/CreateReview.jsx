import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTesxtInput'
import theme from '../theme'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import useCreateReview from '../hooks/useCreateReview'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .integer()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='ownerName'
        placeholder='Repository Owner Name'
        placeholderTextColor={theme.colors.mainBackground}
        style={styles.input}
      />
      <FormikTextInput
        name='repositoryName'
        placeholder='Repository name'
        placeholderTextColor={theme.colors.mainBackground}
        style={styles.input}
      />
      <FormikTextInput
        name='rating'
        placeholder='Rating'
        placeholderTextColor={theme.colors.mainBackground}
        style={styles.input}
      />
      <FormikTextInput
        name='text'
        placeholder='Review'
        placeholderTextColor={theme.colors.mainBackground}
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

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [CreateReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const data = await CreateReview({
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text,
      })
      navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}
export default CreateReview
