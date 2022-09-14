// import required stuff from graphql
const { GraphQLList, GraphQLID } = require("graphql");

// import types
const { UserType, PostType, CommentType } = require("./types");

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

const user = {
  type: UserType,
  description: "Return single user by id",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return User.findById(args.id);
  },
};

const posts = {
  type: new GraphQLList(PostType),
  description: "Return all posts",
  resolve(parent, args) {
    return Post.find();
  },
};

const post = {
  type: PostType,
  description: "Return single post by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Post.findById(args.id);
  },
};

const comments = {
  type: new GraphQLList(CommentType),
  description: "Return all comments",
  resolve(parent, args) {
    return Comment.find();
  },
};

const comment = {
  type: CommentType,
  description: "Return single comment by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Comment.findById(args.id);
  },
};

module.exports = { users, user, posts, post, comment, comments };
