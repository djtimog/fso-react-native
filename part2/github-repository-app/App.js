import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import createApolloClient from "./utils/apolloClient";
import Constants from "expo-constants";

export default function App() {
  const uri =
    Constants.expoConfig?.extra?.apolloUri ?? "http://172.20.10.3:4000/graphql";
  const apolloClient = createApolloClient(uri);

  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <Main />
        <StatusBar style="auto" />
      </NativeRouter>
    </ApolloProvider>
  );
}
