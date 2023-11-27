import model from './model.js';

export const createCombo = (combo) => model.create(combo);

export const findAllCombos = () => model.find();

export const findByName = (name) => model.findOne({ name: name });
export const findByDifficulty = (difficulty) => model.find({ difficulty: difficulty });

export const updateCombo = (name, combo) => model.updateOne({ name: name }, { $set: combo });

export const deleteCombo = (name) => model.deleteOne({ name: name });

//testing finding a string "e.g 2hp" in combo string array, works
export const findSpecificCombo = (oneMove) => model.find({ combo: oneMove });
