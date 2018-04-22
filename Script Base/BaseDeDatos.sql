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
constraint fkCliente foreign key (cliente) references Cliente on update cascade
);

create table Carpeta(
    nombre_carpeta text,
    ruta_padre text,
    primary key (ruta_padre, nombre_carpeta)
);

create table Archivos(
    nombre_archivo text,
    nombre_carpeta text,
    ruta_padre text,
    primary key (ruta_padre, nombre_carpeta, nombre_archivo),
    constraint fkCarpeta foreign key (ruta_padre, nombre_carpeta) references Carpeta on update cascade
);

create table Archivos_Papelera(
    nombre_archivo text,
    nombre_carpeta text,
    ruta_padre text,
    id serial,
    constraint pk_archivos_papelera primary key (id)
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


insert into usuario values('Jerry','Ramirez','11567478','Heredia','112233','asd@gmail.com','jerry','1234',true,'12','12','mensual','111');

drop table Cliente cascade;
drop table Usuario cascade;
drop table Proyecto cascade;
drop table Carpeta cascade;
drop table Archivos cascade;
drop table Proveedor cascade;
drop table Planilla cascade;


-- comando borrar carpetas
-- rd /s /q "C:\Users\Admin\Desktop\a1"