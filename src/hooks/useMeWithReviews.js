import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMeWithReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
  })

  return { me: data ? data.me : undefined, loading, refetch }
}
export default useMeWithReviews
