import model from './model.js';

export const createCombo = (combo) => model.create(combo);

export const findAllCombos = () => model.find();

export const findById = (id) => model.findOne({ _id: id });
export const findByDifficulty = (difficulty) => model.find({ difficulty: difficulty });

export const updateCombo = (id, combo) => model.updateOne({ _id: id }, { $set: combo });

export const deleteCombo = (id) => model.deleteOne({ _id: id });

//testing finding a string "e.g 2hp" in combo string array, works
export const findSpecificCombo = (oneMove) => model.find({ combo: oneMove });
