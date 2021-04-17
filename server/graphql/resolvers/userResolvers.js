const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  handleLoginErrors,
  handleRegisterErrors,
} = require("../../utils/handleErrors");

const generateToken = (user) => {
  return jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.user) {
        return null;
      }

      return (user = await User.findById(req.user));
    },
  },

  Mutation: {
    login: async (_, { email, password }, { res }) => {
      const { errors, valid } = handleLoginErrors(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.general = "Invalid credentials";
        throw new UserInputError("Invalid credentials", { errors });
      }

      const token = generateToken(user);

      res.cookie("token", token, {
        maxAge: 3600 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return user;
    },

    register: async (
      _,
      { registerInput: { email, name, password, confirmPassword } },
      { res }
    ) => {
      const { errors, valid } = handleRegisterErrors(
        email,
        name,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (user) {
        errors.general = "User already exists";
        throw new UserInputError("User already exists", { errors });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new User({ email, name, password: hashed });
      const savedUser = await newUser.save();

      const token = generateToken(savedUser);
      res.cookie("token", token, {
        maxAge: 3600 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return savedUser;
    },

    logout: (_, __, { req, res }) => {
      if (req.user) {
        req.user = null;
      }
      res.clearCookie("token");

      return true;
    },
  },
};
