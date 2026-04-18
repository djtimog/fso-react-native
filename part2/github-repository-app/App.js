import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { NativeRouter } from "react-router-native";
import Main from "./components/Main";
import createApolloClient from "./utils/apolloClient";
import AuthStorage from "./utils/authStorage";
import AuthStorageContext from "./contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <NativeRouter>
          <Main />
          <StatusBar style="auto" />
        </NativeRouter>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
