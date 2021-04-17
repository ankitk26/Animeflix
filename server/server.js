const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

// Initialize express app
const app = express();

// Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// Middlwares
app.use(cors());

// Parse cookies from req object
app.use(cookieParser());

// Set user id on req object
app.use((req, _, next) => {
  const token = req.cookies.token;
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
  } catch {}
  next();
});

server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Start server on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
