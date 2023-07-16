import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
        }
      }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`
