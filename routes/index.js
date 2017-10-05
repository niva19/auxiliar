var express = require('express');
var router = express.Router();

var db = require('../queries');

//Usuarios
// ------------ GET CLIENTES
router.get('/api/customers', db.getAllCustomers);
// ------------ SALVAR CLIENTE
router.post('/api/customers', db.SaveCustomer);
// ------------ EDITAR CLIENTE
router.put('/api/customers', db.EditCustomer);
// ------------ GET CLIENTE
router.post('/api/getcustomer', db.GetCustomer);
// ------------ EDITAR CLIENTE
router.post('/api/deletecustomers', db.DeleteCustomer);
// ------------ BUSCAR CLIENTES
router.post('/api/searchcustomers', db.SearchCustomers);

//Empleados

// ------------ LOG IN 
router.post('/api/empleados', db.login);
// ------------ GET EMPLEADOS 
router.get('/api/getemployees', db.getAllEmployees);
// ------------ SALVAR EMPLEADOS
router.post('/api/saveemployee', db.saveEmployee);
// ------------ EDITAR EMPLEADO
router.put('/api/editemployee', db.editEmployee);
// ------------ GET EMPLEADO
router.post('/api/getemployee', db.getEmployee);
// ------------ ELIMINAR EMPLEADO
router.post('/api/deleteemployee', db.deleteEmployee);
// ------------ BUSCAR EMPLEADO
router.post('/api/searchemployee', db.searchEmployee);








module.exports = router;