var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://postgres:database@localhost:5432/PROARINSADB';
var connectionString = 'postgres://postgres:l53s@localhost:5432/PROARINSADB';
//var connectionString = 'postgres://postgres:mio@localhost:8485/PROARINSADB';
var db = pgp(connectionString);

// METER CADA QUERIE DE CADA TABLA EN UNA .JS POR SEPARADO !!!!!!!!!!!!!!!!!!!!!!!!!

/*********************************************************************************
***************************** TRANSACCIONES DE LA BASE ***************************
************************************* DE DATOS ***********************************
**********************************************************************************/

//  ******************************** PLANILLA ************************************

function getAllWorkers(req, res, next) {
  db.any('select * from Planilla')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function saveWorker(req, res, next) {
  console.log(req.body);
  db.none('insert into Planilla values(${nombre}, ${apellidos}, ${dni}, ${puesto}, ${telefono}, ${fechaEntrada}, ${fechaSalida}, ${tipoSalario}, ${montoSalario})',
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

function editWorker(req, res, next) {
  console.log(req.body);
  db.none('update Planilla set nombre = ${nombre}, apellidos = ${apellidos}, puesto = ${puesto}, telefono = ${telefono}, fechaEntrada = ${fechaEntrada}, fechaSalida = ${fechaSalida}, tipoSalario = ${tipoSalario}, montoSalario=${montoSalario} where dni = ${dni}',
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

function getWorker(req, res, next) {
  console.log(req.body);
  db.any('select * from Planilla where dni=${dni}', req.body)
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

function deleteWorker(req, res, next) {
  console.log(req.body);
  db.none('DELETE FROM Planilla WHERE dni = ${dni}', req.body)
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

function searchWorkers(req, res, next) {
  console.log(req.body)
  db.any('select * from Planilla where ' + req.body.filtro + ' = ${parametro}', req.body)
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

//  ******************************** PROVEEDORES ************************************

function getAllProviders(req, res, next) {
  db.any('select * from Proveedor')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function SaveProvider(req, res, next) {
  console.log(req.body);
  db.none('insert into Proveedor values(${empresa}, ${contacto}, ${telefono}, ${correo} , ${producto})',
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

function EditProvider(req, res, next) {
  console.log(req.body);
  db.none('UPDATE Proveedor SET  contacto = ${contacto}, telefono = ${telefono}, correo = ${correo}, producto = ${producto} where empresa = ${empresa}',
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

function GetProvider(req, res, next) {
  console.log(req.body);
  db.any('select * from Proveedor where empresa=${empresa}', req.body)
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

function DeleteProvider(req, res, next) {
  console.log(req.body);
  db.none('DELETE FROM Proveedor WHERE empresa = ${empresa}', req.body)
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

function SearchProviders(req, res, next) {
  console.log(req.body)
  db.any('select * from Proveedor where ' + req.body.filtro + ' = ${parametro}', req.body)
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


//  ******************************** CLIENTES ************************************

function getAllCustomers(req, res, next) {
  db.any('select nombre, apellidos, cedula from Cliente')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getdetailcustomer(req, res, next) {
  db.any('select direccion, telefono_trabajo, telefono_casa, celular, correo_personal, correo_empresarial from Cliente where cedula = ${cedula}', req.body)
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
  db.none('insert into Cliente values(${nombre}, ${apellidos}, ${cedula}, ${direccion},${telefono_trabajo}, ${telefono_casa}, ${celular}, ${correo_personal}, ${correo_empresarial})',
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
  db.none('UPDATE Cliente SET nombre = ${nombre}, apellidos = ${apellidos}, direccion = ${direccion}, telefono_trabajo = ${telefono_trabajo}, telefono_casa = ${telefono_casa}, celular = ${celular}, correo_empresarial = ${correo_empresarial}, correo_personal = ${correo_personal} where cedula = ${cedula}',
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
  db.any('select * from Usuario where usuario=${user} and contrasena=${password}',
    req.body)
    .then((data) => {
      console.log(data);
      res.status(200)
        .json({
          success: true, data: { nombre: data[0].nombre, dni: data[0].dni, isgerente: data[0].isgerente }
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
  console.log('Req: ',req)
  db.any('select * from Usuario')
    .then(function (data) {
      console.log(data)
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
  db.none('insert into Usuario values(${nombre}, ${apellidos}, ${dni}, ${direccion}, ${telefono}, ${correo}, ${usuario}, ${contrasena}, ${isgerente}, ${fechaentrada}, ${fechasalida}, ${tiposalario}, ${montosalario})',
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
  db.none('update Usuario set nombre = ${nombre}, apellidos = ${apellidos}, direccion = ${direccion}, correo = ${correo}, telefono = ${telefono}, contrasena = ${contrasena}, isgerente = ${isgerente}, fechaentrada = ${fechaentrada}, fechasalida = ${fechasalida}, tiposalario = ${tiposalario}, montosalario = ${montosalario} where dni = ${dni}',
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
  db.any('select * from Usuario where dni=${dni}', req.body)
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
  db.none('DELETE FROM Usuario WHERE dni = ${dni}', req.body)
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
  db.any('select * from Proyecto where cliente = ${cedula}', req.body)
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

  var path = '%userprofile%\\Documents\\SistemaPROARINSA\\' + anio + '\\' + mes + '\\' + nomJunto + '\\archivos'

  db.none('insert into Proyecto values(${nombreProyecto}, ${direccion}, ${tipoProyecto}, ${tipoObra}, ${descripcion}, ${fechaInicio}, ${fechaFinaliza}, ${estado}, ${banco}, ${cliente})',
    req.body)
    .then(() => {
      //EJECUTAR EL COMANDO AQUI
      //CREAR DIRECTORIO
      db.none('UPDATE Proyecto SET ruta = $1 WHERE nombreProyecto = $2', [path, req.body.nombreProyecto]);
      execute('mkdir ' + path, function (output) {
        console.log(output);

        execute('mkdir ' + path + '\\publico', function (output) {
          console.log(output);
        });

        execute('mkdir ' + path + '\\privado', function (output) {
          console.log(output);
        });

        db.none("insert into Carpeta values('publico', '" + path + "', TRUE)")
        db.none("insert into Carpeta values('privado', '" + path + "', FALSE)")

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
  db.none('UPDATE Proyecto SET direccion = ${direccion}, tipoproyecto = ${tipoProyecto}, tipoobra = ${tipoObra}, descripcion = ${descripcion}, fechainicio = ${fechaInicio}, fechafinaliza = ${fechaFinaliza}, estado = ${estado}, banco = ${banco}, cliente = ${cliente}  where nombreproyecto = ${nombreProyecto}',
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

  db.none('insert into Archivos values(${nombre_archivo}, ${nombre_carpeta}, ${ruta_padre}, ${publico})',
    req.body)
    .then(() => {

      // execute(`copy \"${req.body.realPath}\" \"${data[0].archivos}\\${estado}\"`, function (output) {
      //   console.log(output);
      // });

      execute(`copy \"${req.body.realPath}\" \"${req.body.ruta_padre}\\${req.body.nombre_carpeta}\"`, function (output) {
        console.log(output);
      });

      res.status(200)
        .json({
          success: true
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

  let path = `start ${req.body.ruta}`;
  console.log(path);

  execute(path, function (output) {
    console.log(output);
  });

  res.status(200)
    .json({
      success: true
    });

}
function unlink(req, res, next) {
  db.any('update archivos set enlazado = FALSE where ruta_padre = ${ruta_padre} and nombre_carpeta = ${nombre_carpeta} and nombre_archivo = ${nombre_archivo}', req.body)
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


  db.any('delete from archivos where ruta_padre = ${ruta_padre} and nombre_carpeta = ${nombre_carpeta} and nombre_archivo = ${nombre_archivo}', req.body)
    .then(() => {

      let path = `del ${req.body.ruta_padre}\\${req.body.nombre_carpeta}\\\"${req.body.nombre_archivo}\"`;
      console.log(path);

      execute(path, function (output) {
        console.log(output);
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

function searchfiles(req, res, next) {
  console.log(req.body)
  db.any('select nombre_archivo, nombre_carpeta, ruta_padre from Archivos where ruta_padre = ${ruta_padre} and nombre_carpeta = ${nombre_carpeta} and enlazado = TRUE', req.body)
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
  db.any('update archivos set enlazado = TRUE where ruta_padre = ${ruta_padre} and nombre_carpeta = ${nombre_carpeta} and nombre_archivo = ${nombre_archivo}', req.body)
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

function getfolders(req, res, next) {
  db.any("select * from carpeta where ruta_padre = ${ruta}", req.body)
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

function getpublicfolder(req, res, next) {
  db.any("select * from carpeta where ruta_padre = ${ruta} and nombre_carpeta = 'publico'", req.body)
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

function savefolder(req, res, next) {
  db.none('insert into Carpeta values(${nombre_carpeta}, ${ruta_padre}, ${publico})', req.body)
    .then(() => {

      // execute('mkdir ' + path + '\\publico', function (output) {
      //   console.log(output);
      // });
      execute(`mkdir ${req.body.ruta_padre}\\${req.body.nombre_carpeta}`, function (output) {
        console.log(output);
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


//  ********************************* ARCHIVOS ************************************

module.exports = {
  // PLANILLA 
  getAllWorkers: getAllWorkers,
  SaveWorker: saveWorker,
  EditWorker: editWorker,
  GetWorker: getWorker,
  DeleteWorker: deleteWorker,
  SearchWorkers: searchWorkers,
  // PROVEEDORES 
  getAllProviders: getAllProviders,
  SaveProvider: SaveProvider,
  EditProvider: EditProvider,
  GetProvider: GetProvider,
  DeleteProvider: DeleteProvider,
  SearchProviders: SearchProviders,
  // CLIENTES
  getAllCustomers: getAllCustomers,
  getdetailcustomer: getdetailcustomer,
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
  recoveryfile: recoveryfile,
  getfolders: getfolders,
  savefolder: savefolder,
  getpublicfolder: getpublicfolder
}