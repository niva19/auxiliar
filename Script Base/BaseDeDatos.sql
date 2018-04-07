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
cliente text,
ruta text,
constraint pkProyecto primary key (nombreProyecto),
constraint fkCliente foreign key (cliente) references Cliente
);

create table Carpeta(
    nombre text,
    ruta_padre text,
    primary key (nombre, ruta_padre)
)

create table Archivos(
    nombre text,
    nombreProyecto text,
    publico boolean, 
    enlazado boolean DEFAULT TRUE,
    primary key (nombre, nombreProyecto),
    constraint fkProyecto foreign key (nombreProyecto) references Proyecto
);