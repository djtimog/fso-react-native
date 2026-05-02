import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../lib/theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: theme.bgColors.main,
    padding: 10,
  },
  picker: {
    color: theme.colors.textPrimary,
  },
});

const ORDER_OPTIONS = [
  {
    label: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  {
    label: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  {
    label: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
];

export const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ selected, onSelect }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selected}
      onValueChange={onSelect}
      style={styles.picker}
    >
      {ORDER_OPTIONS.map((opt) => (
        <Picker.Item key={opt.label} label={opt.label} value={opt.label} />
      ))}
    </Picker>
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  orderLabel,
  onOrderChange,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <OrderPicker selected={orderLabel} onSelect={onOrderChange} />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [orderLabel, setOrderLabel] = useState(ORDER_OPTIONS[0].label);

  const { orderBy, orderDirection } = ORDER_OPTIONS.find(
    (opt) => opt.label === orderLabel,
  );

  const { repositories, loading } = useRepositories({
    orderBy,
    orderDirection,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderLabel={orderLabel}
      onOrderChange={setOrderLabel}
    />
  );
};

export default RepositoryList;
