// import mongoose models
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

//import required stuff from graphql
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Type",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    Password: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Types",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find(parent.authorId);
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment Types",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.postId);
      },
    },
  }),
});

module.exports = { UserType, PostType, CommentType };
