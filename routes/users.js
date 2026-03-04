var express = require('express');
var router = express.Router();
let { dataUser } = require('../utils/data2');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(dataUser);
});

/* GET user by username */
router.get('/:username', function(req, res, next) {
  const user = dataUser.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/* POST a new user */
router.post('/', function(req, res, next) {
  const newUser = req.body;
  // TODO: Add validation or ID generation if needed
  dataUser.push(newUser);
  res.status(201).json(newUser);
});

/* PUT update user by username */
router.put('/:username', function(req, res, next) {
  const index = dataUser.findIndex(u => u.username === req.params.username);
  if (index !== -1) {
    dataUser[index] = { ...dataUser[index], ...req.body };
    res.json(dataUser[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/* DELETE user by username */
router.delete('/:username', function(req, res, next) {
  const index = dataUser.findIndex(u => u.username === req.params.username);
  if (index !== -1) {
    const deletedUser = dataUser.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
