import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.createUser.id);
    await apolloClient.resetStore();
    return data.createUser.id;
  };

  return [signUp, result];
};

export default useSignUp;
