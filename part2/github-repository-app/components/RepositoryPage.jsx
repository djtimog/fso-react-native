import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { ItemSeparator } from "./RepositoryList";
import { format } from "date-fns";
import theme from "../lib/theme";

export default function RepositoryPage() {
  const { id } = useParams();
  const variables = { repositoryId: id, first: 5 };
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

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
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    backgroundColor: theme.bgColors.repoItem,
  },
  content: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  btnContainer: {
    flexDirection: "row",
    padding: 5,
    gap: 5,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  delBtn: {
    backgroundColor: theme.colors.error,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: theme.colors.button,
    fontWeight: 700,
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

export const ReviewItem = ({ review, currentUser = false, deleteReview }) => {
  const date = format(new Date(review.createdAt), "dd MMM yyyy");
  const navigate = useNavigate();

  const handleViewRepo = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = () =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteReview(review.id) },
      ],
    );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
      {currentUser && (
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleViewRepo}>
            <Text style={styles.btnText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.delBtn} onPress={handleDeleteReview}>
            <Text style={styles.btnText}>Delete review</Text>
          </Pressable>
        </View>
      )}
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
