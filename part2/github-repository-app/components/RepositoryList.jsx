import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
