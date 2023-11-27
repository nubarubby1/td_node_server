import * as dao from './dao.js';

let currentCombo = null;

function ComboRoutes(app) {
  const createCombo = async (req, res) => {
    currentCombo = req.body;
    const actualCombo = await dao.createCombo(currentCombo);
    res.json(actualCombo);
  };

  const findHardCombos = async (req, res) => {
    const hardCombos = await dao.findByDifficulty('Hard');
    res.json(hardCombos);
  };

  const updateCombo = async (req, res) => {
    const { name } = req.params;
    const status = await dao.updateCombo(name, req.body);
    currentCombo = await dao.findByName(name);
    res.json(status);
  };

  const findAllCombos = async (req, res) => {
    const combos = await dao.findAllCombos();
    res.json(combos);
  };

  const deleteCombo = async (req, res) => {
    const { name } = req.params;
    const status = await dao.deleteCombo(name);
    res.json(status);
  };

  const findOneCombo = async (req, res) => {
    const { name } = req.params;

    const status = await dao.findByName(name);
    res.json(status);
  };

  const findSpecificCombo = async (req, res) => {
   
    const { move }  = req.params;
  

    const status = await dao.findSpecificCombo(move);
    res.json(status);
  };

  app.get('/api/oneMove/:move', findSpecificCombo);

  app.post('/api/createCombo', createCombo);
  app.get('/api/combos', findAllCombos);
  app.get('/api/combosHard', findHardCombos);
  app.get('/api/combos/:name', findOneCombo);

  app.put('/api/combos/:name', updateCombo);
  app.delete('/api/delete/:name', deleteCombo);
}

export default ComboRoutes;
