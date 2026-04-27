import { View, Text, FlatList } from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";

export default function RepositoryPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading || error) return <Text>Loading...</Text>;
  const reviews = data?.repository?.reviews?.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryItem item={data?.repository} showUrl />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

const ReviewItem = ({ review }) => {
  return (
    <View>
      <View></View>
    </View>
  );
};
