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

function SaveCustomer(req,res,next){
  console.log(req.body);
  db.none('insert into Cliente values(${nombre}, ${apellidos}, ${cedula}, ${telefono}, ${correo})',
  req.body)
  .then(() =>{
    res.status(200)
      .json({
        success: true
      });
  })
  .catch((err)=>{
    res.status(200)
    .json({
      success: false
    });
  })
}

module.exports = {
  getAllCustomers: getAllCustomers,
  SaveCustomer: SaveCustomer
}

//  ******************************** EMPLEADOS ************************************

//  ****************************** FINANCIAMIENTO *********************************

//  ********************************* PROYECTO ************************************

//  ********************************** ZONAS **************************************

//  ********************************* ARCHIVOS ************************************


