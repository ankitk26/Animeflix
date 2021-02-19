const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema_and_resolvers");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Listen to server
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
