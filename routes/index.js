var express = require('express');
var router = express.Router();

var db = require('../queries');

//Usuarios
router.get('/api/customers', db.getAllCustomers);
router.post('/api/customers', db.SaveCustomer);
router.put('/api/customers', db.EditCustomer);
router.post('/api/getcustomer', db.GetCustomer);
//Empleados
router.post('/api/empleados', db.login);

module.exports = router;