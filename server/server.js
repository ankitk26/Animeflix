const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema_and_resolvers");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

// Listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
