import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import useMeWithReviews from '../hooks/useMeWithReviews'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteView'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItemAndButtonsContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  reviewItemContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 13,
  },
  reviewRightColumn: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 13,
    flexShrink: 1,
  },
  rating: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: 42,
    width: 42,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderRadius: 21,
    borderWidth: 2,
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  createdAt: {
    color: theme.colors.textSecondary,
  },
  reviewText: {
    marginVertical: 3,
  },

  reviewButtonsContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 13,
    paddingTop: 0,
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: 13,
    height: 45,
    flexGrow: 1,
  },
  buttonRed: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.textError,
    justifyContent: 'center',
    borderRadius: 3,
    height: 45,
    flexGrow: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()
  return (
    <View style={styles.reviewItemAndButtonsContainer}>
      <View style={styles.reviewItemContainer}>
        <View style={styles.rating}>
          <Text fontWeight='bold' style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewRightColumn}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.createdAt}>{review.createdAt.split('T')[0]}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.reviewButtonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigate(`/repositories/${review.repositoryId}`)}
        >
          <Text style={styles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable
          style={styles.buttonRed}
          onPress={() => {
            Alert.alert(
              'Delete review',
              'Are you sure you want to delete this review?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: async () => {
                    await deleteReview({ id: review.id })
                    await refetch()
                  },
                },
              ]
            )
          }}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { me, refetch } = useMeWithReviews()
  const reviews =
    me && me.reviews ? me.reviews.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    ></FlatList>
  )
}

export default MyReviews
