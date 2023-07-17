import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useParams } from 'react-router-native'

export const RepositorySinglePageContainer = ({ repositories }) => {
  const id = useParams().id
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []
  const item = repositoryNodes.find(r => r.id === id)
  if (!item) return null

  return <RepositoryItem item={item} isSinglePage />
}

const RepositorySinglePage = () => {
  const { repositories } = useRepositories()

  return <RepositorySinglePageContainer repositories={repositories} />
}

export default RepositorySinglePage
