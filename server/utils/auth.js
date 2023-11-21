const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// Sets token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
    AuthenticationError: new GraphQLError("Could not authenticate user.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),
    // Function for our authenticated routes
    authMiddleware: function (req, res, next) {
        // Allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization;

        // We split the token string into an array and return actual token
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        // If the token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (err) {
            console.error(err);
            return req;
        }

        // Return the request object so it can be passed to the resolver as `context`
        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};