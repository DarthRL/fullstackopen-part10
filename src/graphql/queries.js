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
          url
        }
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
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
