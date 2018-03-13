var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:mio@localhost:8485/PROARINSADB';
//var connectionString = 'postgres://postgres:mio@localhost:8485/PROARINSADB';
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
  db.none('insert into Cliente values(${nombre}, ${apellidos}, ${cedula}, ${direccion},${telefono}, ${correo})',
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
  db.none('UPDATE Cliente SET nombre = ${nombre}, apellidos = ${apellidos}, direccion = ${direccion}, telefono = ${telefono}, correo = ${correo} where cedula = ${cedula}',
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
  db.any('select * from Cliente where cedula=${cedula}', req.body)
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
  db.none('DELETE FROM cliente WHERE cedula = ${cedula}', req.body)
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
  db.any('select * from Cliente where ' + req.body.filtro + ' = ${parametro}', req.body)
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

function getCNA(req, res, next) {
  db.any('select cedula, nombre, apellidos from Cliente')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
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

function getEmployeesCNA(req, res, next) {
  db.any('select cedula, nombre, apellidos from Empleado')
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
  db.none('insert into Empleado values(${nombre}, ${apellidos}, ${cedula}, ${direccion},${telefono}, ${correo}, ${usuario}, ${contrasena}, 0)',
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
  db.none('update empleado set nombre = ${nombre}, apellidos = ${apellidos}, direccion = ${direccion}, correo = ${correo}, telefono = ${telefono}, contrasena = ${contrasena}, privilegios=${privilegios} where cedula = ${cedula}',
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
  db.any('select * from Empleado where cedula=${cedula}', req.body)
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
  db.none('DELETE FROM Empleado WHERE cedula = ${cedula}', req.body)
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
  db.any('select * from Empleado where ' + req.body.filtro + ' = ${parametro}', req.body)
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

//  ********************************* PROYECTO ************************************
function getAllProject(req, res, next) {
  db.any('select * from Proyecto')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}
// ---------- ARBOL DE CARPETAS ----------
var exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) { callback(stdout); });
};

function saveProject(req, res, next) {
  console.log(req.body);

  //EL NOMBRE SE JUNTA EN UNA SOLA CADENA
  var nomProy = req.body.nombreProyecto;
  //Separador: el split elimina los caracteres asignados a lo separadores
  var separador = " ";
  var nomJunto = nomProy.split(separador).join('');

  //LAS FECHAS SE JUNTA EN UNA SOLA CADENA
  var fecha = req.body.fechaInicio;
  //Separador: el split elimina los caracteres asignados a lo separadores
  var separador1 = " ";
  var separador2 = ", ";
  // Se logra el formato mes y año de las carpetas
  var mes = fecha.split(separador2).splice(0, 1).toString().split(separador1).pop();
  var anio = fecha.split(separador1).pop();

  var path = 'E:\\Users\\User\\Documents\\SistemaPROARINSA\\' + anio + '\\' + mes + '\\' + nomJunto + '\\archivos'

  db.none('insert into Proyecto values(${nombreProyecto}, ${direccion}, ${tipoProyecto}, ${tipoObra}, ${descripcion}, ${fechaInicio}, ${fechaFinaliza}, ${estado}, ${banco}, ${cliente}, ${profesionalResponsable})',
    req.body)
    .then(() => {
      //EJECUTAR EL COMANDO AQUI
      //CREAR DIRECTORIO
      db.none('UPDATE Proyecto SET archivos = $1 WHERE nombreProyecto = $2', [path, req.body.nombreProyecto]);
      execute('mkdir ' + path, function (output) {
        console.log(output);

        execute('mkdir ' + path + '\\publico', function (output) {
          console.log(output);
        });

        execute('mkdir ' + path + '\\privado', function (output) {
          console.log(output);
        });

      });
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

function editProject(req, res, next) {
  console.log(req.body);
  db.none('UPDATE Proyecto SET direccion = ${direccion}, tipoproyecto = ${tipoProyecto}, tipoobra = ${tipoObra}, descripcion = ${descripcion}, fechainicio = ${fechaInicio}, fechafinaliza = ${fechaFinaliza}, estado = ${estado}, banco = ${banco}, cliente = ${cliente}, profresponsable = ${profesionalResponsable}  where nombreproyecto = ${nombreProyecto}',
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

function getProject(req, res, next) {
  console.log(req.body);
  db.any('select * from Proyecto where nombreproyecto=${nombreProyecto}', req.body)
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

function deleteProject(req, res, next) {
  console.log(req.body);
  db.none('DELETE FROM Proyecto WHERE nombreproyecto = ${nombreProyecto}', req.body)
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

function searchProject(req, res, next) {
  console.log(req.body)
  db.any('select * from Proyecto where ' + req.body.filtro + ' = ${parametro}', req.body)
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

function savefiles(req, res, next) {

  db.none('insert into Archivos values(${name}, ${proyect}, ${estado})',
    req.body)
    .then(() => {
      db.any('select archivos from Proyecto where nombreproyecto = ${proyect}', req.body)
        .then((data) => {
          // console.log(`AQUI: copy \"${req.body.realPath}\" \" ${data[0].archivos} \"`);

          let estado;
          (req.body.estado) ? estado = "publico"
          : estado = "privado";

          execute(`copy \"${req.body.realPath}\" \"${data[0].archivos}\\${estado}\"`, function (output) {
            console.log(output);
          });
          res.status(200)
            .json({
              success: true
            });
        });
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false,
          error: err
        });
    })
}

function openfile(req, res, next) {

  db.any('select archivos from Proyecto where nombreproyecto = ${pkproyecto}', req.body)
    .then((data) => {
      let estado;
      (req.body.publico == true) ? estado = "publico" : estado = "privado";

      let path = `start ${data[0].archivos}\\${estado}\\\"${req.body.file}\"`;
      console.log(path);

      execute(path, function (output) {
        console.log(output);
      });
      res.status(200)
        .json(data);
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}
function unlink(req, res, next) {
  db.any('update archivos set enlazado = FALSE where nombreproyecto = ${pkproyecto} and nombre = ${file}', req.body)
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

function deletefile(req, res, next) {
  db.any('select archivos from Proyecto where nombreproyecto = ${pkproyecto}', req.body)
    .then((data) => {
      let path = `del ${data[0].archivos}\\\"${req.body.file}\"`;
      console.log(path);

      execute(path, function (output) {
        console.log(output);
      });
      db.any('delete from archivos where nombreproyecto = ${pkproyecto} and nombre = ${file}', req.body)
        .then(() => {
          res.status(200)
            .json({
              success: true
            });
        })
    })
    .catch((err) => {
      res.status(200)
        .json({
          success: false
        });
    })
}

function searchfiles(req, res, next) {
  console.log(req.body)
  db.any('select nombre, publico from Archivos where nombreproyecto = ${nombre} and enlazado = TRUE', req.body)
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
 
function getunlinkfiles(req, res, next) {
  db.any('select * from archivos where enlazado = FALSE')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function recoveryfile(req, res, next) {
  db.any('update archivos set enlazado = TRUE where nombreproyecto = ${pkproyecto} and nombre = ${file}', req.body)
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
//  ********************************* ARCHIVOS ************************************

module.exports = {
  // CLIENTES
  getAllCustomers: getAllCustomers,
  SaveCustomer: SaveCustomer,
  EditCustomer: EditCustomer,
  GetCustomer: GetCustomer,
  DeleteCustomer: DeleteCustomer,
  SearchCustomers: SearchCustomers,
  getCNA: getCNA,
  // EMPLEADOS
  login: login,
  getAllEmployees: getAllEmployees,
  saveEmployee: saveEmployee,
  editEmployee: editEmployee,
  getEmployee: getEmployee,
  deleteEmployee: deleteEmployee,
  searchEmployee: searchEmployee,
  getEmployeesCNA: getEmployeesCNA,
  // PROYECTOS
  getAllProject: getAllProject,
  saveProject: saveProject,
  editProject: editProject,
  getProject: getProject,
  deleteProject: deleteProject,
  searchProject: searchProject,
  savefiles: savefiles,
  searchfiles: searchfiles,
  openfile: openfile,
  deletefile: deletefile,
  unlink: unlink,
  getunlinkfiles: getunlinkfiles,
  recoveryfile: recoveryfile
}