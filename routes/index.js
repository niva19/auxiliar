var express = require('express');
var router = express.Router();

var db = require('../queries');

//Usuarios
router.get('/api/customers', db.getAllCustomers);
router.post('/api/customers', db.SaveCustomer);
router.put('/api/customers', db.EditCustomer);
router.post('/api/getcustomer', db.GetCustomer);
router.post('/api/deletecustomers', db.DeleteCustomer);
router.post('/api/searchcustomers', db.SearchCustomers);

//Empleados
router.post('/api/empleados', db.login);
router.get('/api/getemployers', db.getAllEmployers);
module.exports = router;