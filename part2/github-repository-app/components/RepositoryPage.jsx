import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import { format } from "date-fns";
import theme from "../lib/theme";

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    gap: 5,
    backgroundColor: theme.bgColors.repoItem,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 700,
  },
  miniContainer: {
    gap: 5,
    paddingRight: 50,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
  },
});

export const ReviewItem = ({ review, currentUser = false }) => {
  const date = format(new Date(review.createdAt), "dd MMM yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.miniContainer}>
        <View>
          <Text style={styles.name}>
            {currentUser ? review.repository.fullName : review.user.username}
          </Text>
          <Text>{date}</Text>
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

// "id": "753f3e99-e73a-43a3-9a50-b30d7727c0eb.jaredpalmer.formik",
//               "text": "Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.",
//               "rating": 96,
//               "createdAt": "2026-04-14T10:36:59.971Z",
//               "user": {
//                 "id": "753f3e99-e73a-43a3-9a50-b30d7727c0eb",
//                 "username": "leeroyjenkins"
//               }
//             }
