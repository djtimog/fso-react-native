import { gql } from "@apollo/client";
import { RepositoryFragment } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryFragment
        }
      }
    }
  }
  ${RepositoryFragment}
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      reviews {
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
      }
    }
  }
  ${RepositoryFragment}
`;
