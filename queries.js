var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:mio@localhost:8485/PROARINSADB';
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


function getAllEmployers(req, res, next) {
  db.any('select * from Empleado')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

//  ****************************** FINANCIAMIENTO *********************************

//  ********************************* PROYECTO ************************************

//  ********************************** ZONAS **************************************

//  ********************************* ARCHIVOS ************************************

module.exports = {
  getAllCustomers: getAllCustomers,
  SaveCustomer: SaveCustomer,
  EditCustomer: EditCustomer,
  GetCustomer: GetCustomer,
  DeleteCustomer: DeleteCustomer,
  SearchCustomers: SearchCustomers,
  login: login,
  getAllEmployers: getAllEmployers
}