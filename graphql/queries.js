// import required stuff from graphql
const { GraphQLList } = require("graphql");

// import types
const { UserType } = require("./types");

// import mongoose models
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const users = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find();
  },
};

module.exports = { users };
