import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

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
  signOutText: {
    color: "white",
    fontWeight: "600",
    textAlign: "left",
    fontSize: 18,
  },
});

const AppBar = () => {
  const query = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const isLogIn = query.data?.me;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Link to={"/"}>
          <AppBarTab name={"Repositories"} />
        </Link>

        {!isLogIn ? (
          <Link to={"/sign-in"}>
            <AppBarTab name={"Sign In"} />
          </Link>
        ) : (
          <Pressable onPress={signOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
