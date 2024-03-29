// import types
const { UserType, PostType, CommentType } = require("./types");

//import mongoose models
const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// import required stuff from graphql
const { GraphQLString } = require("graphql");

// import jwt utility
const { createJwtToken } = require("../util/auth");

// Mutations go here
const register = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { username, email, password, displayName } = args;
      let user = await User.findOne({ email });
      if (user) {
        return "user already exists";
      }
      user = new User({
        username,
        email,
        password,
        displayName,
      });
      await user.save();
      const token = createJwtToken(user);
      return token;
    } catch (error) {
      console.log(error);
    }
  },
};

const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { email, password } = args;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      throw new Error("Incorrect credentials");
    }
    console.log(user);

    const token = createJwtToken(user);
    return token;
  },
};

const addPost = {
  type: PostType,
  description: "Create a new blog post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log("Verified user" + verifiedUser);
    if (!verifiedUser) {
      throw new Error("Unauthorized User!");
    }
    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
    });
    return await post.save();
  },
};

const addComment = {
  type: CommentType,
  description: "Create a new comment",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log("Verified user" + verifiedUser);
    if (!verifiedUser) {
      throw new Error("Unauthorized User!");
    }
    const comment = new Comment({
      userId: verifiedUser._id,
      postId: args.postId,
      comment: args.comment,
    });
    return await comment.save();
  },
};

module.exports = { register, login, addPost, addComment };
