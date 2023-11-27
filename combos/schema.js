import mongoose from 'mongoose';

const comboSchema = new mongoose.Schema(
  {
    difficulty: {
      type: String,
      // allowed string values
      enum: ['Easy', 'Normal', 'Hard'],
      default: 'Normal',
    },

    name: { type: String, required: true, unique: true },
    
    // array of strings, need more info
    combo: [String]


  },
  { collection: 'combos' }
);

export default comboSchema;
