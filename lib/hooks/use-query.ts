import { useQuery as useApolloQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const useQuery = (query, options) => {
  return useApolloQuery(gql(query), options);
};

export default useQuery;
