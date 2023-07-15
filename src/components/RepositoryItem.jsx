import { Image, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  flexColumnItemContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRowHeadContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  flexColumnDetailsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 10,
    marginRight: 10,
  },
  flexRowAttributesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
    flexWrap: 'wrap',
  },
  flexColumnAttributesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: { padding: 2, flexShrink: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 3,
    margin: 12,
    marginBottom: 0,
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View
      key={item.id}
      style={[styles.flexColumnItemContainer, { backgroundColor: 'white' }]}
    >
      <View id='first-row' style={styles.flexRowHeadContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: `https://github.com/${item.fullName.split('/')[0]}.png`,
          }}
        />
        <View style={styles.flexColumnDetailsContainer}>
          <Text style={styles.text} fontWeight={'bold'}>
            {item.fullName}
          </Text>
          <Text style={styles.text}>{item.description}</Text>
          <View style={{ paddingLeft: 2, paddingTop: 5 }}>
            <Text
              style={[
                {
                  color: 'white',
                  backgroundColor: theme.colors.primary,
                  borderRadius: 3,
                  padding: 3,
                },
              ]}
            >
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View id='second-row' style={styles.flexRowAttributesContainer}>
        <View style={styles.flexColumnAttributesContainer}>
          <Text style={styles.text} fontWeight={'bold'}>
            {item.stargazersCount}
          </Text>
          <Text style={styles.text}>Stars</Text>
        </View>
        <View style={styles.flexColumnAttributesContainer}>
          <Text style={styles.text} fontWeight={'bold'}>
            {item.forksCount}
          </Text>
          <Text style={styles.text}>Forks</Text>
        </View>
        <View style={styles.flexColumnAttributesContainer}>
          <Text style={styles.text} fontWeight={'bold'}>
            {item.reviewCount}
          </Text>
          <Text style={styles.text}>Reviews</Text>
        </View>
        <View style={styles.flexColumnAttributesContainer}>
          <Text style={styles.text} fontWeight={'bold'}>
            {item.ratingAverage}
          </Text>
          <Text style={styles.text}>Rating</Text>
        </View>
      </View>
    </View>
  )
}
export default RepositoryItem
