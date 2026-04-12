import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.bgColors.tabs,
    width: "100%",
  },
  content: {
    padding: 12,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});

const tabs = [
  {
    name: "Repositories",
    link: "/",
  },
  {
    name: "Sign In",
    link: "/sign-in",
  },
];

const AppBar = () => {
  return (
    <View>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {tabs.map((tab) => (
          <Link key={tab.name} to={tab.link}>
            <AppBarTab name={tab.name} />
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
