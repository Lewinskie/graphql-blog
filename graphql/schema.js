// import required stuff from graphql

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// import queries
const { users } = require("./queries");

// import mutations
const { register, login } = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries for the GraphQL API",
  fields: { users },
});

//Define MutationType

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations for the GraphQL API",
  fields: { register, login },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
