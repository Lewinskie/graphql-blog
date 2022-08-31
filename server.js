const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.port || 4000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
