var express = require('express');
var router = express.Router();

var db = require('../queries');

//Usuarios
// ------------ GET CLIENTES
router.get('/api/customers', db.getAllCustomers);
router.post('/api/getdetailcustomer', db.getdetailcustomer);
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
// ------------ BUSCAR CLIENTES SOLO CON NOMBRE, APELLIDOS Y CEDULA
router.get('/api/customerscna', db.getCNA);

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
// ------------ BUSCAR CLIENTES SOLO CON NOMBRE, APELLIDOS Y CEDULA
router.get('/api/employeescna', db.getEmployeesCNA);

//Proyectos

// ------------ GET PROYECTOS 
router.post('/api/getprojects', db.getAllProject);
// ------------ SALVAR PROYECTOS
router.post('/api/saveproject', db.saveProject);
// ------------ EDITAR PROYECTOS
router.put('/api/editproject', db.editProject);
// ------------ GET PROYECTOS
router.post('/api/getproject', db.getProject);
// ------------ ELIMINAR PROYECTOS
router.post('/api/deleteproject', db.deleteProject);
// ------------ BUSCAR PROYECTOS
router.post('/api/searchproject', db.searchProject);
// ------------ GUARDAR ARCHIVOS
router.post('/api/savefiles', db.savefiles);

// ------------ BUSCAR ARCHIVOS
router.post('/api/searchfiles', db.searchfiles);

router.post('/api/openfile', db.openfile);

router.post('/api/deletefile', db.deletefile);

router.post('/api/unlink', db.unlink);

router.get('/api/getunlinkfiles', db.getunlinkfiles); 

router.post('/api/recoveryfile', db.recoveryfile); 

router.post('/api/searchfiles', db.searchfiles);


router.post('/api/getfolders', db.getfolders);

router.post('/api/savefolder', db.savefolder); 

module.exports = router;