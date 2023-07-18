import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryListHeader = ({ refetch }) => {
  const [selectedOrder, setSelectedOrder] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryValue] = useDebounce(searchQuery, 500)
  useEffect(() => {
    refetch({
      searchKeyword: searchQuery,
      ...orders[selectedOrder],
    })
  }, [selectedOrder, searchQueryValue])
  const orders = {
    'Latest repositories': { orderBy: 'CREATED_AT' },
    'Highest rated repositories': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
    'Lowest rated repositories': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  }
  return (
    <>
      <Searchbar
        placeholder='Search'
        onChangeText={query => {
          setSearchQuery(query)
        }}
        value={searchQuery}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={itemValue => {
          setSelectedOrder(itemValue)
        }}
      >
        <Picker.Item label='Latest repositories' value='Latest repositories' />
        <Picker.Item
          label='Highest rated repositories'
          value='Highest rated repositories'
        />
        <Picker.Item
          label='Lowest rated repositories'
          value='Lowest rated repositories'
        />
      </Picker>
    </>
  )
}

export const RepositoryListContainer = ({
  repositories,
  refetch,
  onEndReach,
}) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={<RepositoryListHeader refetch={refetch} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0}
    />
  )
}

const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepositories({
    first: 4,
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      refetch={refetch}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
