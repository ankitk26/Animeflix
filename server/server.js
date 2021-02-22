const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
