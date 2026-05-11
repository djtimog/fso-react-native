import { gql } from "@apollo/client";

export const RepositoryFragment = gql`
  fragment RepositoryFragment on Repository {
    id
    language
    fullName
    description
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
    watchersCount
    userHasReviewed
    forksCount
  }
`;

export const ReviewFragment = gql`
  fragment ReviewFragment on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`;
