// import required stuff from graphql

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// import queries
const { users, user, post, posts } = require("./queries");

// import mutations
const { register, login, addPost } = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries for the GraphQL API",
  fields: { users, user, post, posts },
});

//Define MutationType

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations for the GraphQL API",
  fields: { register, login, addPost },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
