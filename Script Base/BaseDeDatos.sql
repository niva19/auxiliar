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

constraint pkProveedor primary key (empresa) DEFERRABLE
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

create table Historial
(
fecha timestamp,
nombre text,
accion text,
modulo text,
);

insert into usuario values('Luis','Carrillo','40232014','Heredia','222222','asd@gmail.com','admin','admin',true,'12/03/2015','12/03/2015','mensual','25000');
insert into usuario values('Jerry','Ramirez','11567478','Heredia','112233','asd@gmail.com','jerry','1234',true,'12','12','mensual','111');

drop table Cliente CASCADE;
drop table Usuario CASCADE;
drop table Proyecto CASCADE;
drop table Carpeta CASCADE;
drop table Archivos CASCADE;
drop table Proveedor CASCADE;
drop table Planilla CASCADE;


-- comando borrar carpetas
-- rd /s /q "C:\Users\Admin\Desktop\a1"