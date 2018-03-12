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

  constructor(private ProyService: ProyectosService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.ProyService.GetUnlinkFiles().subscribe(files => {
      console.log(files)
      this.files = files;
    });
  }

  Recuperar_Archivo(file, pkproyecto){
    this.ProyService.RecuperarArchivo({file: file, pkproyecto: pkproyecto}).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se recupero exitosamente', 3000, 'green rounded')
    });
  }

  Confirmar_Eliminar(file, pkproyecto){
    this.ProyService.EliminarArchivo({file: file, pkproyecto: pkproyecto}).subscribe(res => {
      this.getAll()
      Materialize.toast('El archivo se elimino exitosamente', 3000, 'green rounded')
    });
  }

}
