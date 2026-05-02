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
