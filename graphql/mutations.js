// import types
const { UserType } = require("./types");

//import mongoose models
const User = require("../models/User");
// const Comment = require("../models/Comment");
// const Post = require("../models/Post");

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
    const token = createJwtToken(user);
    return token;
  },
};

module.exports = { register, login };
