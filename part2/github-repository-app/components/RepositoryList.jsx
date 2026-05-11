import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { useMemo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../lib/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  separator: {
    height: 10,
  },

  header: {
    backgroundColor: theme.bgColors.main,
    padding: 10,
    gap: 10,
  },

  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },

  picker: {
    color: theme.colors.textPrimary,
    backgroundColor: "white",
    borderRadius: 8,
  },
  pickerItem: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  loading: {
    padding: 20,
    textAlign: "center",
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

const ListHeader = ({
  searchQuery,
  setSearchQuery,
  orderLabel,
  setOrderLabel,
}) => {
  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Search repositories"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <Picker
        selectedValue={orderLabel}
        onValueChange={(value) => setOrderLabel(value)}
        style={styles.picker}
      >
        {ORDER_OPTIONS.map((option) => (
          <Picker.Item
            key={option.label}
            label={option.label}
            value={option.label}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  orderLabel,
  setOrderLabel,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories?.edges?.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <ListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          orderLabel={orderLabel}
          setOrderLabel={setOrderLabel}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderLabel, setOrderLabel] = useState(ORDER_OPTIONS[0].label);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchKeyword] = useDebounce(searchQuery, 500);

  const selectedOrder = useMemo(
    () => ORDER_OPTIONS.find((option) => option.label === orderLabel),
    [orderLabel],
  );

  const { repositories, loading } = useRepositories({
    orderBy: selectedOrder.orderBy,
    orderDirection: selectedOrder.orderDirection,
    searchKeyword,
  });

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <RepositoryListContainer
        repositories={repositories}
        orderLabel={orderLabel}
        setOrderLabel={setOrderLabel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
};

export default RepositoryList;
