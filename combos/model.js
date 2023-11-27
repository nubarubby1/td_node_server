import mongoose from "mongoose";
import schema from "./schema.js";

// create mongoose model from the schema
const model = mongoose.model("combos", schema);
export default model;