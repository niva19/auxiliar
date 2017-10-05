var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@localhost:5432/PROARINSADB';
var db = pgp(connectionString);

// METER CADA QUERIE DE CADA TABLA EN UNA .JS POR SEPARA !!!!!!!!!!!!!!!!!!!!!!!!!

/*********************************************************************************
***************************** TRANSACCIONES DE LA BASE ***************************
************************************* DE DATOS ***********************************
**********************************************************************************/

//  ******************************** CLIENTES ************************************

function getAllCustomers(req, res, next) {
  db.any('select * from Cliente')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function SaveCustomer(req, res, next) {
  console.log(req.body);
  db.none('insert into Cliente values(${nombre}, ${apellidos}, ${cedula}, ${telefono}, ${correo})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}

function EditCustomer(req, res, next) {
  console.log(req.body);
  db.none('UPDATE Cliente SET nombre = ${nombre}, apellidos = ${apellidos}, telefono = ${telefono}, correo = ${correo} where cedula = ${cedula}',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}

function GetCustomer(req, res, next) {
  console.log(req.body);
  db.any('select * from Cliente where cedula=${cedula}',req.body)
  .then((data) => {
    console.log(data);
    res.status(200)
      .json(data[0]);
  })
  .catch(function (err) {
    res.status(200)
      .json({
        success: false
      });
  });
}

function DeleteCustomer(req, res, next) {
  console.log(req.body);
  db.none('DELETE FROM cliente WHERE cedula = ${cedula}',req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}


function SearchCustomers(req, res, next) {
  console.log(req.body)
  db.any('select * from Cliente where '+ req.body.filtro +' = ${parametro}',req.body)
  .then((data) => {
    console.log(data);
    res.status(200)
      .json(data);
  })
  .catch(function (err) {
    res.status(200)
      .json({
        success: false
      });
  });
}  

//  ******************************** EMPLEADOS ************************************

function login(req, res, next) {
  // console.log(req.body);
  db.any('select * from empleado where usuario=${user} and contrasena=${password}',
    req.body)
    .then((data) => {
      console.log(data);
      res.status(200)
        .json({
          success: true, data: { nombre: data[0].nombre, cedula: data[0].cedula, privilegios: data[0].privilegios }
        });
    })
    .catch(function (err) {
      res.status(200)
        .json({
          success: false
        });
    });
}

function getAllEmployees(req, res, next) {
  db.any('select * from Empleado')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function saveEmployee(req, res, next) {
  console.log(req.body);
  db.none('insert into Empleado values(${nombre}, ${apellidos}, ${cedula}, ${telefono}, ${correo}, ${usuario}, ${contrasena}, ${privilegios})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}

function editEmployee(req, res, next) {
  console.log(req.body);
  db.none('UPDATE Empleado SET nombre = ${nombre}, apellidos = ${apellidos}, correo = ${correo}, telefono = ${telefono}, contrasena = ${contrasena}, privilegios= ${privilegios}  where cedula = ${cedula}',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })    
}

function getEmployee(req, res, next) {
  console.log(req.body);
  db.any('select * from Empleado where cedula=${cedula}',req.body)
  .then((data) => {
    console.log(data);
    res.status(200)
      .json(data[0]);
  })
  .catch(function (err) {
    res.status(200)
      .json({
        success: false
      });
  });
}

function deleteEmployee(req, res, next) {
  console.log(req.body);
  db.none('DELETE FROM Empleado WHERE cedula = ${cedula}',req.body)
    .then(() => {
      res.status(200)
        .json({
          success: true
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}


function searchEmployee(req, res, next) {
  console.log(req.body)
  db.any('select * from Empleado where '+ req.body.filtro +' = ${parametro}',req.body)
  .then((data) => {
    console.log(data);
    res.status(200)
      .json(data);
  })
  .catch(function (err) {
    res.status(200)
      .json({
        success: false
      });
  });
}  

//  ****************************** FINANCIAMIENTO *********************************

//  ********************************* PROYECTO ************************************

//  ********************************** ZONAS **************************************

//  ********************************* ARCHIVOS ************************************

module.exports = {
  // CLIENTES
  getAllCustomers: getAllCustomers,
  SaveCustomer: SaveCustomer,
  EditCustomer: EditCustomer,
  GetCustomer: GetCustomer,
  DeleteCustomer: DeleteCustomer,
  SearchCustomers: SearchCustomers,
  // EMPLEADOS
  login: login,
  getAllEmployees: getAllEmployees,
  saveEmployee: saveEmployee,
  editEmployee: editEmployee,
  getEmployee: getEmployee,
  deleteEmployee: deleteEmployee,
  searchEmployee: searchEmployee,
}