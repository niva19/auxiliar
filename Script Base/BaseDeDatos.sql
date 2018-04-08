/* Tabla de Cliente */

create table Cliente
( 
nombre text,
apellidos text,
cedula text,
direccion text,
telefono_trabajo text,
telefono_casa text,
celular text,
correo_personal text,
correo_empresarial text,
constraint pkCliente primary key (cedula) 
);

/* Tabla de Empleado */
/* nombre, apellidos, dni, direccion, telefono, correo , usuario, contrasena, isGerente, fechaEntrada, fechaSalida, tipoSalario, montoSalario */
create table Usuario
( 
nombre text,
apellidos text,
dni text,
direccion text,
telefono text,
correo text,
usuario text,
contrasena text,
isGerente boolean,
fechaEntrada text, 
fechaSalida text, 
tipoSalario text, 
montoSalario text,

constraint pkUsuario primary key (dni) 
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
cliente text,
ruta text,
constraint pkProyecto primary key (nombreProyecto),
constraint fkCliente foreign key (cliente) references Cliente
);

create table Carpeta(
    nombre text,
    ruta_padre text,
    primary key (nombre, ruta_padre)
);

create table Archivos(
    nombre text,
    nombreProyecto text,
    publico boolean, 
    enlazado boolean DEFAULT TRUE,
    primary key (nombre, nombreProyecto),
    constraint fkProyecto foreign key (nombreProyecto) references Proyecto
);

/* Tabla de Proveedor */

create table Proveedor
( 
empresa text,
contacto text,
telefono text,
correo text,
producto text,

constraint pkProveedor primary key (empresa) 
);

/* Tabla de Planilla */

create table Planilla
( 
nombre text,
apellidos text,
dni text,
puesto text,
telefono text,
fechaEntrada text,
fechaSalida text,
tipoSalario text,
montoSalario text,

constraint pkPlanilla primary key (dni) 
);