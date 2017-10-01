var express = require('express');
var router = express.Router();

var db = require('../queries');

//Usuarios
router.get('/api/customers', db.getAllCustomers);
router.post('/api/customers', db.SaveCustomer);

//Empleados
router.post('/api/empleados', db.login);

module.exports = router;