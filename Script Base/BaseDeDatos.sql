/* Tabla de Financiamiento */

create table Financiamiento
( 
codFinanciamiento text,
tipo text,
banco text,
detalle text,
constraint pkFinanciamiento primary key (codFinanciamiento) 
);

/* Tabla de Empleado */

create table Empleado
( 
cedula text,
nombre text,
usuario text,
contrasena text,
apellido text,
correo text,
direccion text,
privilegios int,
constraint pkEmpleado primary key (cedula) 
);

/* Tabla de Proyecto */

create table Proyecto
( 
codProyecto text,
tipoProyecto text,
descripcion text,
fechaInicio text,
fechaFinaliza text,
tipoObra text,
estado int,
-- Foraneas 
financiamiento text,
profResponsable text,
latitud int,
longitud int,
minutos int,
segundos int,
ubicacion text,
constraint pkProyecto primary key (codProyecto), 
constraint fkFinanciamiento foreign key (financiamiento) references Financiamiento, 
constraint fkEmpleado foreign key (profResponsable) references Empleado
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
hfhd
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

/* Tabla Relacion Cliente-Proyecto */

create table ProyectoCliente
( 
-- Foraneas
cedula text,
codProyecto text,
constraint pkProyectoCliente primary key (cedula,codProyecto),
constraint fkCliente foreign key (cedula) references Cliente,
constraint fkProyecto2 foreign key (codProyecto) references Proyecto
);