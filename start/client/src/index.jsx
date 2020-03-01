import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import Login from "./pages/login";
import injectStyles from "./styles";
import { resolvers, typeDefs } from "./resolvers";
import gql from "graphql-tag";

const cache = new InMemoryCache();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    headers: { authorization: localStorage.getItem('token') },
    uri: "http://localhost:4000/graphql",
  }),
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});


injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);