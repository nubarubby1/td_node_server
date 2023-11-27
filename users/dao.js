import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserByEmail = (email) => model.findOne({ email: email });

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

  // uses findOne(from Mongoose model) to retrieve a document w/ username and password
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
