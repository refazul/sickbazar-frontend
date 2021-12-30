import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache({}),
    uri: "https://graphql.crescentcoder.com/graphql"
});

export default client;