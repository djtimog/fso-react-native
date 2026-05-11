import { View, Text, FlatList } from "react-native";
import React from "react";
import { ReviewItem } from "./RepositoryPage";
import useUser from "../hooks/useUser";
import { ItemSeparator } from "./RepositoryList";

const MyReviews = () => {
  const { user, loading, error } = useUser();

  if (loading && error) return <Text>Loading...</Text>;
  if (user?.reviews?.edges.length === 0) return <Text>No reviews yet</Text>;
  return (
    <FlatList
      data={user?.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} currentUser />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
