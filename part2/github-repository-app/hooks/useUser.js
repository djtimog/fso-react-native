import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useUser = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  return { user: data?.me, loading, error };
};

export default useUser;
