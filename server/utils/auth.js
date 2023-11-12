const jwt = require("jsonwebtoken");

// Sets token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
    // Function for our authenticated routes
    authMiddleware: function (req, res, next) {
        // Allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return res.status(400).json({ message: "You have no token!" });
        }

        // Verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (err) {
            console.log("Invalid token");
            return res.status(400).json({ message: "Invalid token!" })
        }

        // Sends to next endpoint
        next();
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};