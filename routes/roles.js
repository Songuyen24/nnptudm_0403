var express = require('express');
var router = express.Router();
let { dataRole, dataUser } = require('../utils/data2');

/* GET roles listing. */
router.get('/', function(req, res, next) {
  res.json(dataRole);
});

/* GET role by id */
router.get('/:id', function(req, res, next) {
  const role = dataRole.find(r => r.id === req.params.id);
  if (role) {
    res.json(role);
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

/* POST a new role */
router.post('/', function(req, res, next) {
  const newRole = req.body;
  dataRole.push(newRole);
  res.status(201).json(newRole);
});

/* PUT update role by id */
router.put('/:id', function(req, res, next) {
  const index = dataRole.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    dataRole[index] = { ...dataRole[index], ...req.body };
    res.json(dataRole[index]);
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

/* DELETE role by id */
router.delete('/:id', function(req, res, next) {
  const index = dataRole.findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    const deletedRole = dataRole.splice(index, 1);
    res.json(deletedRole[0]);
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
});

/* GET users by role id */
router.get('/:id/users', function(req, res, next) {
  const roleId = req.params.id;
  const role = dataRole.find(r => r.id === roleId);
  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }
  
  const users = dataUser.filter(u => u.role && u.role.id === roleId);
  res.json(users);
});

module.exports = router;
