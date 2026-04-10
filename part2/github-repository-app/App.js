import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import theme from "./theme";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColors.main,
    alignItems: "center",
    justifyContent: "center",
  },
});
