const express = require("express");
const path = require("path");

// Imports Apollo server class and Express server middleware
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const { authMiddleware } = require("./utils/auth");

// Imports typeDefs and resolvers as well as the connection to the db to complete the two parts of the GraphQL schema below
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

// New instance of Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/graphql", expressMiddleware(server, {
        context: authMiddleware
    }));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

// Calling the async function to start the server
startApolloServer();


// Previous build of server before creating a new instance of the Apollo server above and intigrating most of the below code into that
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// If we're in production, serve client/build as statis assets
// if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.use(routes);

// db.once("open", () => {
//     app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });