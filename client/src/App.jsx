import "./App.css";
import { Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";

// Constructs our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Constructs request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Gets the authentication token from the local storage if it exists
  const token = localStorage.getItem("id_token");
  // Returns the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Sets up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;