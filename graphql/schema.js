// import required stuff from graphql

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// import queries
const { users, user, post, posts, comment, comments } = require("./queries");

// import mutations
const { register, login, addPost, addComment } = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries for the GraphQL API",
  fields: { users, user, post, posts, comment, comments },
});

//Define MutationType

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations for the GraphQL API",
  fields: { register, login, addPost, addComment },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
