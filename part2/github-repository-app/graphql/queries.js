import { gql } from "@apollo/client";
import { RepositoryFragment, ReviewFragment } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }

  ${ReviewFragment}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment

      reviews {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }

  ${RepositoryFragment}
  ${ReviewFragment}
`;
