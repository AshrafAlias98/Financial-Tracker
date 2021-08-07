const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");

const typeDefs = require("./graphql/typeDefs"); // The GraphQL schema
const resolvers = require("./graphql/resolvers"); // A map of functions which return data for the schema.

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log("Database connected!!"))
    .catch((err) => console.log(err));
});
