// import required stuff from graphql

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// import queries
const {} = require("./queries");

// import mutations
const {} = require("./mutation");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries for the GraphQL API",
  fields: {},
});

//Define MutationType

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations for the GraphQL API",
  fields: {},
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
