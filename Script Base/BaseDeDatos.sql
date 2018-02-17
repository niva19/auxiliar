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
-- Path de archivos 
archivos text,
-- Localizacion  -- Cuando se haga lo del API DE GOOGLE osea vacaciones 
-- latitud int,
-- longitud int,
-- minutos int,
-- segundos int,
-- ubicacion text,
-- 
constraint pkProyecto primary key (nombreProyecto),
constraint fkEmpleado foreign key (profResponsable) references Empleado,
constraint fkCliente foreign key (cliente) references Cliente
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

