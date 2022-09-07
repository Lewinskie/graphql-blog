const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const { authenticate } = require("./middleware/auth");

const app = express();
dotenv.config();
connectDB();

app.use(authenticate);
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
const PORT = process.env.port || 4000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
