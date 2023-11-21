// typeDefs
const typeDefs = `
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Query {
        me: User
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedBookInput {
        bookId: String!
        authors: [String]
        title: String!
        description: String!
        image: String
        link: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: SavedBookInput!): User
        removeBook(bookId: ID!): User
    }
    `;

    module.exports = typeDefs;