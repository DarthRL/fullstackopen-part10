import { Image, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import * as Linking from 'expo-linking'

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
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    borderRadius: 3,
    padding: 15,
    margin: 12,
    marginTop: 0,
  },
  buttonText: {
    color: 'white',
  },
})

const RepositoryItem = ({ item, isSinglePage }) => {
  return (
    <View
      testID='repositoryItem'
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
              style={{
                color: 'white',
                backgroundColor: theme.colors.primary,
                borderRadius: 3,
                paddingTop: 2,
                paddingHorizontal: 5,
                paddingBottom: 4,
              }}
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
      {isSinglePage && (
        <Pressable
          onPress={() => Linking.openURL(item.url)}
          style={styles.button}
        >
          <Text fontWeight='bold' style={styles.buttonText}>
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  )
}
export default RepositoryItem
