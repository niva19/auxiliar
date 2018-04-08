import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
import { ArchivosService } from '../../services/archivos.service'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  files: any[]
  file: String
  pkproyecto: String
  archivo_aux: any = { ruta_padre: "", nombre_carpeta: "", nombre_archivo: "" }

  constructor(private Archivos_Service: ArchivosService) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }

  Obtener_nombre_proyecto(ruta){
    var cont = 0
    var nombre_proyecto = ""
    for (var i = 0; i < ruta.length; i++) {
      if(cont == 7){
        if(ruta.charAt(i) == "\\") break;
        nombre_proyecto += ruta.charAt(i)
      } 
      else if(ruta.charAt(i) == "\\") cont++
    }
    return nombre_proyecto
  }

  Publico_Privado(tipo){
    return (tipo) ? "Publico" : "Privado"
  }

  getAll() {
    this.Archivos_Service.Papelera().subscribe(files => {
      files.forEach(file => {
        file["publico"] = this.Publico_Privado(file.publico)
        file["nombre_proyecto"] = this.Obtener_nombre_proyecto(file.ruta_padre)
      });
      console.log(files)
      this.files = files;
    });
  }

  Modal_Recuperar(archivo){
    this.archivo_aux.ruta_padre = archivo.ruta_padre
    this.archivo_aux.nombre_carpeta = archivo.nombre_carpeta
    this.archivo_aux.nombre_archivo = archivo.nombre_archivo
    $('#recuperar').modal('open');
  }

  Modal_Eliminar(archivo){
    this.archivo_aux.ruta_padre = archivo.ruta_padre
    this.archivo_aux.nombre_carpeta = archivo.nombre_carpeta
    this.archivo_aux.nombre_archivo = archivo.nombre_archivo
    $('#eliminar').modal('open');
  }

  Recuperar_Archivo(){
    this.Archivos_Service.Recuperar_Archivo(this.archivo_aux).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se recupero exitosamente', 3000, 'green rounded')
    });
  }

  Eliminar_Archivo(){
    this.Archivos_Service.Eliminar_Archivo(this.archivo_aux).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se elimino exitosamente', 3000, 'green rounded')
    });
  }

}
