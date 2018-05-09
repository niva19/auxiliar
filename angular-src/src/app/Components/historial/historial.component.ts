import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
import { ArchivosService } from '../../services/archivos.service'
import { CarpetasService } from '../../services/carpetas.service'
import { ReporteService } from '../../services/reporte.service'
import * as Materialize from 'angular2-materialize'
import { ROUTER_INITIALIZER } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  files: any[]
  folders: any[]
  file: String
  archivo_aux: any = { ruta_padre: "", nombre_carpeta: "", nombre_archivo: "" }
  files_arr: any[] = []
  folders_arr: any[] = []
  duplicate_file: any
  //true = carpeta, false = archivo
  chk: String = ".chk_folders"
  ruta_actual: String


  constructor(private Archivos_Service: ArchivosService, 
              private reporteService: ReporteService,
              private Carpetas_Service: CarpetasService) { }

  ngOnInit() {
    $('.tabs').tabs();
    $(".tabs .indicator ").css("background-color", "black");
    $('.modal').modal();
    $('#remplazar_omitir').modal({
      dismissible: false
    })
    this.getAll();
    this.get_carpetas();
  }
  /*1*/
  getAll() {
    this.Archivos_Service.Papelera().subscribe(files => {
      this.files = files;
    });
  }

  get_carpetas(){
    this.Carpetas_Service.Papelera().subscribe(folders => {
      console.log(folders)
      this.folders = folders
    });
  }
  /*1*/



  Confirmar_Eliminar() {
    if(this.chk == ".chk_folders"){
      this.Confirmar_Eliminar_Carpetas()
    }
    else if(this.chk == ".chk_proyect_files"){
      this.Confirmar_Eliminar_Archivos_Proyecto();
    }
    else if(this.chk == ".chk_customer_files"){

    }
  }

  /*1*/
  Confirmar_Eliminar_Carpetas(){
    let checkboxes = $('.chk_folders:checkbox:checked');
    (checkboxes.length == 1)
      ? $('#mensaje_eliminar_carpetas').text("¿Está seguro que desea eliminar este elemento de forma permanente?")
      : $('#mensaje_eliminar_carpetas').text(`¿Está seguro que desea eliminar estos ${checkboxes.length} elementos de forma permanente?`);
    $('#eliminar_carpetas').modal('open');
  }
  Eliminar_Carpetas(){
    let checkboxes = $('.chk_folders:checked')

    this.files_arr = []
    for (let i = 0; i < checkboxes.length; i++) {
      let id = checkboxes[i].attributes[4].nodeValue
      this.files_arr.push(this.folders[id].id)
    }
    console.log(this.files_arr)
    this.Carpetas_Service.Eliminar_Carpeta_Permanentemente(this.files_arr).subscribe(res =>{
      this.unselect_all()
      if (res.success) {
        Materialize.toast(`Los carpetas se eliminaron exitosamente`, 3000, 'green rounded')
        this.get_carpetas()
      }
      else Materialize.toast(`Error, no se eliminaron las carpetas`, 3000, 'red rounded')
    })
  }
  /*1*/

  /*2*/
  Confirmar_Eliminar_Archivos_Proyecto() {
    let checkboxes = $('.chk_proyect_files:checkbox:checked');
    (checkboxes.length == 1)
      ? $('#mensaje_eliminar_archivos_proyecto').text("¿Está seguro que desea eliminar este elemento de forma permanente?")
      : $('#mensaje_eliminar_archivos_proyecto').text(`¿Está seguro que desea eliminar estos ${checkboxes.length} elementos de forma permanente?`);
    $('#eliminar_archivos_proyecto').modal('open');
  }
  Eliminar_Archivos_Proyecto() {
    let checkboxes = $('.chk_proyect_files:checked')

    this.files_arr = []
    for (let i = 0; i < checkboxes.length; i++) {
      let id = checkboxes[i].attributes[4].nodeValue
      this.files_arr.push({
        id: this.files[id].id,
        nombre_archivo: this.files[id].nombre_archivo
      })
    }

    const reporte = {
      nombre: localStorage.getItem('nombre') + ' (' + localStorage.getItem('dni') + ')',
      accion: 'Eliminar',
      modulo: 'Papelera',
      alterado: 'NONE'
    }

    this.Archivos_Service.Eliminar_Archivo(this.files_arr).subscribe(res => {
      this.unselect_all()
      if (res.success) {
        Materialize.toast(`Los archivos se eliminaron exitosamente`, 3000, 'green rounded')
        this.getAll()
      }
      else Materialize.toast(`Error, no se eliminaron los archivos`, 3000, 'red rounded')

      res.arr.forEach(e => {
        //NOW ADDING TO HISTORY
        reporte.alterado = e.nombre_archivo;
        this.reporteService.addReport(reporte).subscribe(data => {
          if (!data.success) {
            Materialize.toast('Error al guardar historial', 3000, 'red rounded')
          }
        })
        //END OF history
      });
    });
  }
  /*2*/
  

  Confirmar_Recuperar() {
    if(this.chk == ".chk_folders"){
      this.Confirmar_Recuperar_Carpetas()
    }
    else if(this.chk == ".chk_proyect_files"){
      this.Confirmar_Recuperar_Archivos_Proyecto();
    }
    else if(this.chk == ".chk_customer_files"){

    }
  }

  /*1*/
  Confirmar_Recuperar_Carpetas(){
    let checkboxes = $('.chk_folders:checkbox:checked');
    (checkboxes.length == 1)
      ? $('#mensaje_recuperar_carpetas').text("¿Está seguro de recuperar este elemento?")
      : $('#mensaje_recuperar_carpetas').text(`¿Está seguro de recuperar estos ${checkboxes.length} elementos?`);
    $('#recuperar_carpetas').modal('open');
  }
  Recuperar_Carpetas(){
    let checkboxes = $('.chk_folders:checked')

    this.folders_arr = []
    for (let i = 0; i < checkboxes.length; i++) {
      let id = checkboxes[i].attributes[4].nodeValue
      let values = this.update_folder_path(this.folders[id].ruta, this.folders[id].nombreproyecto)
      this.folders_arr.push({
        id: parseInt(this.folders[id].id),
        nombre_carpeta: this.folders[id].nombre_carpeta,
        update_path: values[0],
        slash_path: this.points_to_slash(values[1]),
        update_full_path: values[1]
      })
    }
    console.log(this.folders_arr)

    this.Carpetas_Service.Recuperar_Carpetas(this.folders_arr).subscribe(res =>{
      this.get_carpetas()
    })
  }
  rem_or_omi_Recuperar_Carpeta(){
  }
  /*1*/

  /*2*/
  Confirmar_Recuperar_Archivos_Proyecto(){
    let checkboxes = $('.chk_proyect_files:checkbox:checked');
    (checkboxes.length == 1)
      ? $('#mensaje_recuperar_archivos_proyecto').text("¿Está seguro de recuperar este elemento?")
      : $('#mensaje_recuperar_archivos_proyecto').text(`¿Está seguro de recuperar estos ${checkboxes.length} elementos?`);
    $('#recuperar_archivos_proyecto').modal('open'); 
  }
  Recuperar_Archivos_Proyecto() {
    let checkboxes = $('.chk_proyect_files:checkbox:checked')

    this.files_arr = []
    for (let i = 0; i < checkboxes.length; i++) {
      let id = checkboxes[i].attributes[4].nodeValue
      this.files_arr.push(this.files[id])
      let obj = this.get_update_path(this.files[id].ruta_padre, this.files[id].nombre_proyecto)
      this.files_arr[i]["ruta_padre"] = obj.ruta_points
      this.files_arr[i]["ruta_slash"] = obj.ruta_slash
    }

    const reporte = {
      nombre: localStorage.getItem('nombre') + ' (' + localStorage.getItem('dni') + ')',
      accion: 'Recuperar',
      modulo: 'Papelera',
      alterado: 'NONE'
    }

    console.log(this.files_arr)
    this.Archivos_Service.Recuperar_Archivo(this.files_arr).subscribe(res => {
      console.log(res)
      if (!res.success) {
        this.duplicate_file = res
        $('#mensaje_remplazar_omitir').text(`El destino ya posee un archivo llamado \"${res.file.nombre_archivo}\"`);
        $('#remplazar_omitir').modal('open');
      }
      else {
        this.getAll()
        //recuperado
        reporte.alterado = res.name;
        this.reporteService.addReport(reporte).subscribe(data => {
          if (!data.success) {
            Materialize.toast('Error al guardar historial', 3000, 'red rounded')
          }
        })
        //END OF history
      }
    });
  }
  rem_or_omi_Archivos_proyecto(opcion) {

    if (opcion == "reemplazar") {
      this.files_arr[this.duplicate_file.pos][opcion] = true
      this.files_arr.splice(0, this.duplicate_file.pos);
    }
    else {
      this.files_arr.splice(0, this.duplicate_file.pos + 1);
    }

    if (this.files_arr.length != 0) {
      this.Archivos_Service.Recuperar_Archivo(this.files_arr).subscribe(res => {
        console.log(res)
        if (!res.success) {
          this.duplicate_file = res
          $('#mensaje_remplazar_omitir_archivos_proyecto').text(`El destino ya posee un archivo llamado \"${res.file.nombre_archivo}\"`);
        }
        else {
          $('#remplazar_omitir_archivos_proyecto').modal('close');
          this.getAll()
        }
      });
    }
    else {
      $('#remplazar_omitir_archivos_proyecto').modal('close');
      this.getAll()
    }
  }
  /*2*/


  update_folder_path(str,nombre_proyecto){
    var cont = 0;
    var p1,p2;
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == '.') cont++;
      if(cont == 5){
        p1 = i;
        cont++;
      }
      else if(cont == 7){
        p2 = i;
        break;
      }
    }

    for (var j = str.length; j > -1; j--) {
      if (str.charAt(j) == '.') break;
    }

    var half_path = `${str.substring(0,p1)}.${nombre_proyecto}`
    var full_path = `${half_path}.${str.substring(p2 + 1, j)}`
    return [half_path, full_path]
  }


  get_update_path(str, nombre_proyecto){
    var userprofile = "%"
    var i;
    for (i = 0; i < str.length; i++) {
      if (str.charAt(i) == '.') break
      userprofile += str.charAt(i)
    }
    userprofile += "%"
    userprofile = `${userprofile}.${str.substring(i + 1, str.lenght)}`

    var cont = 0;
    var p1, p2;
    for (i = 0; i < userprofile.length; i++) {
      if (userprofile.charAt(i) == '.') cont++
      if(cont == 5){
        p1 = i;
        cont++
      }  
      if(cont == 7){
        p2 = i
        break
      } 
    }

    var proyecto = userprofile.substring(p1+1,p2)

    if(proyecto == nombre_proyecto){
      return {ruta_points: str, ruta_slash: userprofile.split('.').join('\\')}
    }

    else{
      var ruta_points = `${userprofile.substring(0,p1+1)}${nombre_proyecto}${userprofile.substring(p2,userprofile.length)}`
      var ruta_slash = ruta_points.split('.').join('\\');
      ruta_points = ruta_points.split('%').join('');
      return {ruta_points: ruta_points, ruta_slash: ruta_slash}
    }

  }

  ver_ruta(ruta) {
    this.ruta_actual = this.get_path(ruta)
    $('#modal_ruta').modal('open');
  }

  get_path(str) {

    var cont = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == '.') cont++
      if (cont == 5) break;
    }

    var points = str.substring(i + 1, str.lenght)
    points = points.split('.').join('\\');
    return points
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



  Anyone_checked() {
    return ($(`${this.chk}:checkbox:checked`).length != 0) ? true : false
  }

  select_all() {
    $(this.chk).prop('checked', true)
  }

  unselect_all() {
    $(this.chk).prop('checked', false)
  }

  Ir_Opciones() {
    $('#opciones').modal('open');
  }

  change_chk(chk){
    this.unselect_all()
    this.chk = chk
  }
}
