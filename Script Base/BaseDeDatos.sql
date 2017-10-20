/* Tabla de Financiamiento */

/*create table Financiamiento
tipo text,BANHVI ARTICULO 59 O REGULARES 
detalle text,
*/

/* Tabla de Empleado */

create table Empleado
( 
nombre text,
apellidos text,
cedula text,
telefono text,
correo text,
usuario text,
contrasena text,
-- direccion text,
privilegios int,
constraint pkEmpleado primary key (cedula) 
);

/* Tabla de Proyecto */

create table Proyecto
( 
-- codProyecto text,
nombreProyecto text,
tipoProyecto text,
tipoObra text,
descripcion text,
fechaInicio text,
fechaFinaliza text,
estado text,
banco text,
-- Foraneas 
cliente text,
profResponsable text,
-- Localizacion  -- Cuando se haga lo del API DE GOOGLE osea vacaciones 
-- latitud int,
-- longitud int,
-- minutos int,
-- segundos int,
-- ubicacion text,
-- 
constraint pkProyecto primary key (nombreProyecto) 
-- constraint fkEmpleado foreign key (profResponsable) references Empleado --Agregar cuando este listo dropdown
);

/* Tabla de Archivo */

create table Archivo
( 
codArchivo text,
nombre text,
ubicacion text,
-- Foraneas
codProyecto text,
constraint pkArchivo primary key (codArchivo),
constraint fkProyecto foreign key (codProyecto) references Proyecto
);

/* Tabla de Cliente */

create table Cliente
( 
nombre text,
apellidos text,
cedula text,
telefono text,
correo text,
-- direccion text(30),
constraint pkCliente primary key (cedula) 
);

