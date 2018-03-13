import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
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

  constructor(private ProyService: ProyectosService) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }

  getAll() {
    this.ProyService.GetUnlinkFiles().subscribe(files => {
      console.log(files)
      this.files = files;
    });
  }

  Modal_Recuperar(file, pkproyecto){
    $('#recuperar').modal('open');
    this.file = file
    this.pkproyecto = pkproyecto
  }

  Modal_Eliminar(file, pkproyecto){
    $('#eliminar').modal('open');
    this.file = file
    this.pkproyecto = pkproyecto
  }

  Recuperar_Archivo(){
    this.ProyService.RecuperarArchivo({file: this.file, pkproyecto: this.pkproyecto}).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se recupero exitosamente', 3000, 'green rounded')
    });
  }

  Eliminar_Archivo(){
    this.ProyService.EliminarArchivo({file: this.file, pkproyecto: this.pkproyecto}).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se elimino exitosamente', 3000, 'green rounded')
    });
  }

}
