import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from '../../services/reporte.service'
import { ClienteArchivosService } from '../../services/cliente-archivos.service'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cliente-archivos',
  templateUrl: './cliente-archivos.component.html',
  styleUrls: ['./cliente-archivos.component.css']
})
export class ClienteArchivosComponent implements OnInit {

  flag: boolean = true
  upload_files: any[] = []
  archivos: any[]
  carpeta_actual: any = { nombre_carpeta: "", ruta_padre: "" }

  @ViewChild('myInput')
  myInputVariable: any;

  constructor(private reporteService: ReporteService,
              private clienteArchivosService: ClienteArchivosService) { }

  ngOnInit() {
    $('.modal').modal();
    $('.dropdown-button').dropdown();
  }


  modal1() {
    $('#modal1').modal({
      ready: function () {
        $('ul.tabs').tabs();
      }
    })
    this.upload_files = []
    $('#modal1').modal('open');
  }

  onChange(event: any) {
    let files = event.target.files
    console.log("**target files** ", files)
    if (files.length != 0) {
      Object.keys(files).forEach(key => {
        let file = files[key]
        var extension = ""
        for (var i = file.name.length - 1; i > -1; i--) {
          if (file.name.charAt(i) != '.') extension += file.name.charAt(i)
          else break
        }
        this.upload_files.push({ name: file.name, path: file.path, ext: this.invertir(extension) })
      });
    }
    this.upload_files = this.removeDuplicates(this.upload_files, "path");
    this.myInputVariable.nativeElement.value = "";
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

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  delete_upload_file(name) {
    for (var i = 0; i < this.upload_files.length; i++) {
      if (this.upload_files[i].name == name) break
    }
    this.upload_files.splice(i, 1);
  }


  Enlazar_Archivos() {
    if (this.upload_files.length != 0) {

      let archivos = this.upload_files.map(file => {
        return {
          realPath: file.path,
          ruta: this.carpeta_actual.ruta_padre,
          nombre_archivo: file.name,
          ruta_padre: this.carpeta_actual.ruta_padre
        };
      })
      const reporte = {
        nombre: localStorage.getItem('nombre') + ' (' + localStorage.getItem('dni') + ')',
        accion: 'Agregar',
        modulo: 'Archivos',
        alterado: 'NONE'
      }

      this.set_path(archivos)
      console.log(archivos)

      this.clienteArchivosService.Guardar_Archivo(archivos).subscribe(res => {
        var flag = false;
        var aux_arr = []

        for (let i = 0; i < res.arr.length; i++) {
          if (!res.arr[i].success) {
            if (res.arr[i].err.code == "23505") {
              Materialize.toast(`El archivo "${this.upload_files[i].name}" ya existe`, 7000, 'red rounded')
              flag = true;
              aux_arr.push(false)
            }
          }
          else {
            Materialize.toast(`El archivo "${this.upload_files[i].name}" se enlazo al proyecto exitosamente`, 3000, 'green rounded')
            aux_arr.push(true)

            this.get_extension(archivos[i])

            this.archivos.push(archivos[i])
            //NOW ADDING TO HISTORY
            reporte.alterado = this.upload_files[i].name;
            this.reporteService.addReport(reporte).subscribe(data => {
              if (!data.success) {
                Materialize.toast('Error al guardar historial', 3000, 'red rounded')
              }
            })
            //END OF history
          }
        }
        this.limpiar_upload_files(aux_arr);
        (!flag) ? $('#modal1').modal('close') : null;
      })
    }
    else Materialize.toast('Debe elegir al menos un archivo', 3000, 'red rounded')
  }

  set_path(data) {
    data.forEach(e => {
      var userprofile = "%"
      var i;
      for (i = 0; i < e.ruta.length; i++) {
        if (e.ruta.charAt(i) == '.') break
        userprofile += e.ruta.charAt(i)
      }
      userprofile += "%"
      userprofile = `${userprofile}.${e.ruta.substring(i + 1, e.ruta.lenght)}`
      userprofile = userprofile.split('.').join('\\');
      e.ruta = userprofile
    });
  }

  get_extension(archivo) {
    var extension = ""
    for (var i = archivo.nombre_archivo.length - 1; i > -1; i--) {
      if (archivo.nombre_archivo.charAt(i) != '.') extension += archivo.nombre_archivo.charAt(i)
      else break
    }
    archivo["extension"] = this.invertir(extension)
  }

  limpiar_upload_files(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i]) this.upload_files.splice(i, 1);
    }
  }

  set_flag(val) {
    this.flag = val
  }

  eliminar(){

  }

  select_all_carpeta() {
    $('.chk_carpeta').prop('checked', true);
  }

  mostar_editar_nombre_carpeta(num) {
    $("#tt" + num).css("display", "none")
    $("#ii" + num).css("display", "block")
    $("#input_carpeta" + num).focus()
  }

  editar_nombre(num, file, ) {
    var new_name = $("#input" + num).val()
    if (new_name == "") {
      Materialize.toast(`Error, debe ingresar un nombre`, 3000, 'red rounded')
      return;
    }
    if (file.nombre_archivo != new_name) {
      this.clienteArchivosService.Cambiar_Nombre_Archivo({
        ruta_padre: file.ruta_padre,
        new_name: new_name,
        nombre_archivo: file.nombre_archivo,
        real_path: this.points_to_slash(file.ruta_padre)
      }).subscribe(res => {

        if (res.success) {
          $("#i" + num).css("display", "none")
          $("#t" + num).css("display", "block")
          this.archivos[num]["nombre_archivo"] = new_name
        }
        else Materialize.toast(`Error, ya existe un archivo llamado "${new_name}"`, 3000, 'red rounded')
      })
    }
    else {
      $("#i" + num).css("display", "none")
      $("#t" + num).css("display", "block")
    }
  }

  points_to_slash(str) {
    var userprofile = "%"
    var i;
    for (i = 0; i < str.length; i++) {
      if (str.charAt(i) == '.') break
      userprofile += str.charAt(i)
    }
    userprofile += "%"
    userprofile = `${userprofile}.${str.substring(i + 1, str.lenght)}`
    userprofile = userprofile.split('.').join('\\');
    return userprofile
  }

  get_path_destination_folder(origin, folder_name) {
    for (var i = origin.length; i > -1; i--) {
      if (origin.charAt(i) == '.') break;
    }
    return `${origin.substring(0, i)}.${folder_name}`
  }

  Descargar_Archivo(file) {
    $("#descargando_archivo").modal("open")
    this.clienteArchivosService.Descargar_Archivo({
      ruta: `${this.points_to_slash(file.ruta_padre)}\\`,
      nombre_archivo: `\"${file.nombre_archivo}\"`
    }).subscribe(res => {
      if (res.output) {
        setTimeout(() => {
          $("#descargando_archivo").modal("close")
          Materialize.toast('Archivo descargado', 3000, 'green rounded')
        }, 1200);
      }
    })
  }

  Abrir_Archivo(file) {
    this.clienteArchivosService.Abrir_Archivo({ ruta: `${this.points_to_slash(file.ruta_padre)}\\\"${file.nombre_archivo}\"` }).subscribe(res => {
      Materialize.toast('Abriendo archivo', 3000, 'green rounded')
    })
  }
}
