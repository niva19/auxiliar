/* Tabla de Cliente */

create table Cliente
( 
nombre text,
apellidos text,
cedula text,
direccion text,
telefono text,
correo text,

constraint pkCliente primary key (cedula) 
);

/* Tabla de Empleado */

create table Empleado
( 
nombre text,
apellidos text,
cedula text,
direccion text,
telefono text,
correo text,
usuario text,
contrasena text,
privilegios int,

constraint pkEmpleado primary key (cedula) 
);

/* Tabla de Proyecto */

create table Proyecto
( 
nombreProyecto text,
direccion text,
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

constraint pkProyecto primary key (nombreProyecto),
constraint fkEmpleado foreign key (profResponsable) references Empleado,
constraint fkCliente foreign key (cliente) references Cliente
);
