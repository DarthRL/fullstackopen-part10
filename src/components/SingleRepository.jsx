import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import { FlatList, StyleSheet, View } from 'react-native'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import theme from '../theme'

export const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} isSinglePage />
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
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
    paddingLeft:13,
    flexShrink: 1
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
    color:theme.colors.textSecondary
  },
  reviewText: {
    marginVertical: 3,
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review }) => {
  console.log(review)
  return (
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
  )
}

const SingleRepository = () => {
  const id = useParams().id
  const { repository } = useRepository(id)
  if (!repository) return null
  console.log(repository.reviews)
  const reviews = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : []
  console.log(reviews)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    ></FlatList>
  )
}

export default SingleRepository
