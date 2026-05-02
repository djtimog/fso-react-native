import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import theme from "../lib/theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 10,
    flexDirection: "column",
    backgroundColor: theme.bgColors.repoItem,
    width: "100%",
  },
  cardContent: {
    display: "flex",
    gap: 20,
    flexDirection: "row",
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  cardMainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  cardTitle: {
    fontWeight: "800",
    fontFamily: theme.font.main,
  },
  cardDescription: {
    color: "gray",
    fontFamily: theme.font.main,
  },
  cardLanguage: {
    backgroundColor: theme.bgColors.repoTag,
    color: "white",
    borderRadius: 3,
    padding: 5,
    fontFamily: theme.font.main,
  },
  cardStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardStatItem: {
    alignItems: "center",
  },
  cardStatNumber: {
    fontWeight: "800",
    fontFamily: theme.font.main,
  },
  urlBtn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  urlBtnText: {
    color: theme.colors.button,
    fontWeight: "800",
    fontFamily: theme.font.main,
    fontSize: 18,
    textAlign: "center",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count;
};

const RepositoryItem = ({ item, showUrl = false }) => {
  return (
    <View style={styles.card} testID="repositoryItem">
      <View style={styles.cardContent}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.cardImage} />
        <View style={styles.cardMainContent}>
          <Text style={styles.cardTitle}>{item.fullName}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardLanguage}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.cardStats}>
        <View style={styles.cardStatItem}>
          <Text style={styles.cardStatNumber}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.cardStatItem}>
          <Text style={styles.cardStatNumber}>
            {formatCount(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.cardStatItem}>
          <Text style={styles.cardStatNumber}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.cardStatItem}>
          <Text style={styles.cardStatNumber}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showUrl && (
        <Pressable
          style={styles.urlBtn}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.urlBtnText}>Open in Github</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
