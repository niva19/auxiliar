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
nombreProyecto text,
constraint pkPlanilla primary key (dni),
constraint fkProyecto foreign key (nombreProyecto) references Proyecto on update cascade 
);

-- CREATE EXTENSION ltree;

create table Carpeta(
    ruta ltree,
	constraint pkCarpeta primary key (ruta)
)

create table Archivos(
    nombre_archivo text,
    ruta_padre ltree,
    primary key (ruta_padre, nombre_archivo),
    constraint fkCarpeta foreign key (ruta_padre) references Carpeta on update cascade
);

create table Carpetas_Papelera(
    ruta ltree,
    nombreProyecto text,
    children text,
    id bigserial,
    constraint pk_carpetas_papelera primary key (id),
    constraint fkProyecto_Carpetas_Papelera foreign key (nombreProyecto) references Proyecto
);
-- el children seria un json con toda la descendencia de la carpeta

create table Archivos_Papelera(
    nombre_archivo text,
    nombre_proyecto text,
    ruta_padre ltree,
    id bigserial,
    constraint pk_archivos_papelera primary key (id),
    constraint fkProyecto_Archivos_Papelera foreign key (nombre_proyecto) references Proyecto
);


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


create table Proveedor
( 
empresa text,
contacto text,
telefono text,
correo text,
producto text,
constraint pkProveedor primary key (empresa) 
);  


create table Historial
(
fecha timestamp,
nombre text,
accion text,
modulo text,
alterado text
);


-- select Update_Folders('Miraflores', 'Miraflores2');

-- CREATE OR REPLACE FUNCTION Update_Folders(tree text, new_tree text) 
-- RETURNS VOID AS $$
-- DECLARE
--     rec RECORD;
--     aux_tree ltree;
-- BEGIN
--     FOR rec IN SELECT * FROM carpeta WHERE ruta <@ text2ltree(tree)
--     LOOP
--         if nlevel(text2ltree(tree)) = nlevel(rec.ruta) then 
--             update carpeta 
--             set ruta = text2ltree(new_tree)
--             where ruta = rec.ruta;	

--         else
--             aux_tree = subltree(rec.ruta, nlevel(text2ltree(tree)) , nlevel(rec.ruta));
--             update carpeta 
--             set ruta = text2ltree(new_tree) || aux_tree
--             where ruta = rec.ruta;
--         end if; 
--     END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;

insert into usuario values('Luis','Carrillo','40232014','Heredia','222222','asd@gmail.com','sub','123',false,'12/03/2015','12/03/2015','mensual','25000');
insert into usuario values('Jerry','Ramirez','11567478','Heredia','112233','asd@gmail.com','admin','admin',true,'12','12','mensual','111');

-- drop table Cliente CASCADE;
-- drop table Usuario CASCADE;
-- drop table Proyecto CASCADE;
-- drop table Carpeta CASCADE;
-- drop table Archivos CASCADE;
-- drop table Proveedor CASCADE;
-- drop table Planilla CASCADE;