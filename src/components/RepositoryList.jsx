import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const OrderPicker = ({ refetch }) => {
  const [selectedOrder, setSelectedOrder] = useState()
  const variables = {
    'Latest repositories':{ orderBy: 'CREATED_AT' },
    'Highest rated repositories':{ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    'Lowest rated repositories':{ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  }
  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={async itemValue => {
        await refetch(variables[itemValue])
        setSelectedOrder(itemValue)
      }}
    >
      <Picker.Item
        label='Latest repositories'
        value='Latest repositories'
      />
      <Picker.Item
        label='Highest rated repositories'
        value='Highest rated repositories'
      />
      <Picker.Item
        label='Lowest rated repositories'
        value='Lowest rated repositories'
      />
    </Picker>
  )
}

export const RepositoryListContainer = ({ repositories, refetch }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={<OrderPicker refetch={refetch} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories()

  return (
    <RepositoryListContainer repositories={repositories} refetch={refetch} />
  )
}

export default RepositoryList
