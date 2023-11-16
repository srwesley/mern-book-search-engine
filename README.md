# MERN Book Search Engine
Assignment for Week 21 - MERN for bootcamp.

## Task
This assignment was to create a fullstack web application using a fully function Google Books API search engine built into it with a RESTful API, and then to refactor it to be a GraphQL API built with an Apollo Server. This app was to be built using the MERN stack - so with a React front end, MongoDB database, and Node.js/Express.js server and API.

Albeit there being starter code, my responsibilities were, as mentioned above, refactor the existing code to using GraphQL API and the Apollo Server. So for the back end/`server` directory, I had to work with both the `auth.js` and `server.js` files to implement the appropriate middleware. I also had to add in a `Schemas` directory with an `index.js`, a `resolvers.js`, and a `typeDefs.js` file, which the last had to include `Query` and `Mutation` types.

I also had to work in the front end/`client` directory by adding the `queries.js` and `mutations.js` files to the `utils` directory. Additonally in the front end, I needed to add an `Apollo Provider` to the `App.jsx` file, have the `SearchBooks.jsx`, `SavedBooks.jsx`, `SignupForm.jsx`, and `LoginForm.jsx` files use the various mutations and queries set up in the aforementioned `utils` directory.

However, I couldn't complete refactor everything as I mostly just ran out of time, but I needed to go about and make sure to get rid of any files relying on the RESTful API, and to replace any mention of RESTful APIs with GraphQL APIs in any other files not mentioned above.

I was not able to build the site and have not been able to deploy it as of this moment, but will plan to go back and work with this more when I can so that it can be deployed.