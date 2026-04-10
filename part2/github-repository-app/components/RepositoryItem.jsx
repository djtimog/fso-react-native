import { View, Text } from "react-native";
import React from "react";

// {
//     id: string;
//     fullName: string;
//     description: string;
//     language: string;
//     forksCount: number;
//     stargazersCount: number;
//     ratingAverage: number;
//     reviewCount: number;
//     ownerAvatarUrl: string;
// }

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
