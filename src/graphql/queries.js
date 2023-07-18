import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          fullName
          description
          ratingAverage
          stargazersCount
          language
          forksCount
          reviewCount
          url
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`
export const ME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
            }
            repositoryId
          }
        }
      }
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation ($id: ID!) {
    deleteReview(id: $id)
  }
`

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`
export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      createdAt
      id
      reviewCount
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            repository {
              id
              fullName
            }
            repositoryId
            text
            user {
              id
              username
            }
            userId
          }
        }
      }
      username
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation (
    $ownerName: String!
    $rating: Int!
    $repositoryName: String!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        rating: $rating
        repositoryName: $repositoryName
        text: $text
      }
    ) {
      id
      rating
      createdAt
      repository {
        id
        fullName
      }
      repositoryId
      text
      user {
        id
        username
      }
    }
  }
`
