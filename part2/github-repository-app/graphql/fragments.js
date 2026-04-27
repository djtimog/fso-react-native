import { gql } from "@apollo/client";

export const RepositoryFragment = gql`
  fragment RepositoryFragment on Repository {
    id
    language
    name
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    watchersCount
    userHasReviewed
    forksCount
  }
`;
