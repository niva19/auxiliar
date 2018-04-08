import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarpetasService } from '../../services/carpetas.service'
import { ArchivosService } from '../../services/archivos.service'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  pkProyecto: String
  archivos: any[]
  carpetas: any[]
  carpeta_actual: any = { nombre_carpeta: "", ruta_padre: "", publico: false }
  archivo_eliminar: any = { ruta_padre: "", nombre_carpeta: "", nombre_archivo: "" }

  @ViewChild('abc')
  private abc: ElementRef

  constructor(private Archivos_Service: ArchivosService,
    private Carpetas_Service: CarpetasService) { }

  ngOnInit() {
    console.log("ruta_proyecto: ", localStorage.getItem("ruta_proyecto"));
    $('.modal').modal();
    $('.tabs').tabs();
    $('.dropdown-button').dropdown();
    this.Carpetas(localStorage.getItem("ruta_proyecto"));
  }

  modal1() {
    $('#modal1').modal('open');
  }

  Confirmar_Desenlazar(archivo) {
    this.archivo_eliminar.ruta_padre = archivo.ruta_padre
    this.archivo_eliminar.nombre_carpeta = archivo.nombre_carpeta
    this.archivo_eliminar.nombre_archivo = archivo.nombre_archivo
    $('#desenlazar').modal('open');
  }

  Archivos(ruta_padre, nombre_carpeta) {
    this.Archivos_Service.Obtener_Archivos({ ruta_padre: ruta_padre, nombre_carpeta: nombre_carpeta }).subscribe(archivos => {

      archivos.forEach(archivo => {
        var extension = ""
        for (var i = archivo.nombre_archivo.length - 1; i > -1; i--) {
          if (archivo.nombre_archivo.charAt(i) != '.') extension += archivo.nombre_archivo.charAt(i)
          else break
        }

        archivo["extension"] = this.invertir(extension)
      })
      this.archivos = archivos
    })
  }

  Carpetas(ruta) {
    this.Carpetas_Service.Obtener_Carpetas({ ruta: ruta }).subscribe(carpetas => {
      console.log(carpetas)
      this.carpetas = carpetas
    })
  }

  Abrir_Carpeta(carpeta) {
    this.carpeta_actual.ruta_padre = carpeta.ruta_padre
    this.carpeta_actual.nombre_carpeta = carpeta.nombre_carpeta
    this.carpeta_actual.publico = carpeta.publico
    console.log(this.carpeta_actual)

    this.Carpetas(carpeta.ruta_padre + "\\" + carpeta.nombre_carpeta)
    this.Archivos(carpeta.ruta_padre, carpeta.nombre_carpeta)
  }

  invertir(cadena) {
    var x = cadena.length;
    var cadenaInvertida = "";

    while (x >= 0) {
      cadenaInvertida += cadena.charAt(x);
      x--;
    }
    return cadenaInvertida;
  }


  Enlazar_Carpeta() {
    if ($('#nombre_carpeta').val() == "") {
      Materialize.toast('Debe agregar un nombre', 3000, 'red rounded')
    }
    else {
      let carpeta = {
        nombre_carpeta: $('#nombre_carpeta').val(),
        ruta_padre: `${this.carpeta_actual.ruta_padre}\\${this.carpeta_actual.nombre_carpeta}`,
        publico: this.carpeta_actual.publico
      }

      this.Carpetas_Service.Guardar_Carpeta(carpeta).subscribe(res => {
        if (res) {
          $('#modal1').modal('close');
          Materialize.toast('Carpeta Agregada', 3000, 'green rounded')
          this.Carpetas(`${this.carpeta_actual.ruta_padre}\\${this.carpeta_actual.nombre_carpeta}`)
        }
        else Materialize.toast('Error en la base de datos', 3000, 'red rounded')
      })
    }
  }

  Enlazar_Archivos() {
    if (this.abc.nativeElement.files[0]) {


      let archivo = {
        realPath: this.abc.nativeElement.files[0].path,
        nombre_archivo: $('#fl2').val(),
        nombre_carpeta: this.carpeta_actual.nombre_carpeta,
        ruta_padre: this.carpeta_actual.ruta_padre,
        publico: this.carpeta_actual.publico
      }

      console.log(archivo)
      this.Archivos_Service.Guardar_Archivo(archivo).subscribe(res => {
        if (res.error) {
          Materialize.toast('El archivo ya esta enlazado al proyecto', 3000, 'red rounded')
        }
        else {
          this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
          Materialize.toast('El archivo se enlazo al proyecto exitosamente', 3000, 'green rounded')
          $('#modal1').modal('close');
        }
      })
    }
    else Materialize.toast('Debe elegir un archivo', 3000, 'red rounded')
  }

  Abrir_Archivo(archivo) {
    this.Archivos_Service.Abrir_Archivo({ ruta: `${archivo.ruta_padre}\\${archivo.nombre_carpeta}\\\"${archivo.nombre_archivo}\"` }).subscribe(res => {
      Materialize.toast('Abriendo archivo', 3000, 'green rounded')
    })
  }

  Desenlazar_Archivo() {
    this.Archivos_Service.Desenlazar_Archivo(this.archivo_eliminar).subscribe(res => {
      Materialize.toast('El archivo se desenlazo correctamente', 3000, 'green rounded')
      this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
    })
  }
}
