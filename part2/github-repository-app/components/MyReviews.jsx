import { View, Text, FlatList, Alert } from "react-native";
import React from "react";
import { ReviewItem } from "./RepositoryPage";
import useUser from "../hooks/useUser";
import { ItemSeparator } from "./RepositoryList";
import useDeleteReview from "../hooks/useDeleteReview";

const MyReviews = () => {
  const { user, loading, error, refetch } = useUser();
  const [deleteReview] = useDeleteReview();

  if (loading && error) return <Text>Loading...</Text>;
  if (user?.reviews?.edges.length === 0) return <Text>No reviews yet</Text>;

  const handleDeleteReview = (id) => {
    try {
      deleteReview({ deleteReviewId: id });
    } catch (error) {
      Alert.alert("Error", "Failed to delete review", { text: "OK" });
    }
    refetch();
  };

  return (
    <FlatList
      data={user?.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          currentUser
          deleteReview={handleDeleteReview}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
