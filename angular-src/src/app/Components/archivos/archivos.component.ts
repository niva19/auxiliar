import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarpetasService } from '../../services/carpetas.service'
import { ArchivosService } from '../../services/archivos.service'
import { ReporteService } from '../../services/reporte.service'
import { Router } from '@angular/router'
import { IngresarService } from '../../services/ingresar.service'
import { ActivatedRoute } from '@angular/router'
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
  upload_files: any[] = []
  carpeta_lista: any[] = []
  carpeta_actual: any = { nombre_carpeta: "", ruta_padre: "" }
  archivos_eliminar: any[] = []
  archivos_mover: any[] = []
  archivo_repetido: any
  flag: boolean = true


  constructor(private Archivos_Service: ArchivosService,
    private reporteService: ReporteService,
    private Carpetas_Service: CarpetasService,
    private ingresarService: IngresarService,
    private router: Router,
    private route: ActivatedRoute, ) { }


  ngOnInit() {
    $('.modal').modal();

    $('#archivo_repetido').modal({
      dismissible: false
    })

    $('.tabs').tabs();
    $('.dropdown-button').dropdown();
    (localStorage.getItem("carpeta_actual")) ? this.call_from_gerente_bridge() : this.call_from_proyectos()
  }

  padre_id(ruta) {
    var id = ""
    for (var i = ruta.length - 1; i > -1; i--) {
      if (ruta.charAt(i) == "\\") break
      else id += ruta.charAt(i)
    }

    return id.split("").reverse().join("")
  }


  set_flag(val) {
    this.flag = val
  }

  select_all() {
    $('.chk').prop('checked', true);
  }

  call_from_gerente_bridge() {
    let carpeta_actual = JSON.parse(localStorage.getItem("carpeta_actual"))
    this.carpeta_actual.nombre_carpeta = carpeta_actual.nombre_carpeta
    this.carpeta_actual.ruta_padre = carpeta_actual.ruta_padre
    this.Carpetas(this.carpeta_actual.ruta_padre + "\\" + this.carpeta_actual.nombre_carpeta)
    this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)

    this.carpeta_lista.push({
      nombre_carpeta: this.carpeta_actual.nombre_carpeta,
      ruta_padre: this.carpeta_actual.ruta_padre
    })

    console.log("Carpeta Actual: ", this.carpeta_actual)
    console.log("Lista Carpetas: ", this.carpeta_lista)
  }

  call_from_proyectos() {
    this.Carpetas_Service.Obtener_Carpeta_Publica({ ruta: localStorage.getItem("ruta_proyecto") }).subscribe(carpeta => {
      this.carpeta_actual.nombre_carpeta = carpeta[0].nombre_carpeta
      this.carpeta_actual.ruta_padre = carpeta[0].ruta_padre
      this.Carpetas(this.carpeta_actual.ruta_padre + "\\" + this.carpeta_actual.nombre_carpeta)
      this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
    })
  }

  modal1() {
    $('#modal1').modal({
      ready: function () {
        $('ul.tabs').tabs();
      }
    })
    $('#modal1').modal('open');
  }

  Confirmar_eliminar_Carpeta(carpeta) {
    this.Carpetas_Service.Eliminar_Carpeta(carpeta).subscribe(res => {
      if (res.success) {
        this.Carpetas(this.carpeta_actual.ruta_padre + "\\" + this.carpeta_actual.nombre_carpeta)
        
      }
      else
        Materialize.toast('ERROR, primero debe borrar el contenido de esta carpeta', 5000, 'red rounded')

    })
  }

  Confirmar_Desenlazar() {
    $('#opciones').modal('close');
    this.archivos_eliminar = []
    let checkboxes = $('.chk:checkbox:checked')

    for (let i = 0; i < checkboxes.length; i++) {
      this.archivos_eliminar.push({
        ruta_padre: this.carpeta_actual.ruta_padre,
        nombre_carpeta: this.carpeta_actual.nombre_carpeta,
        nombre_archivo: checkboxes[i].attributes[4].nodeValue
      })
    }
    console.log(this.archivos_eliminar);
    (checkboxes.length == 1)
      ? $('#mensaje_eliminar').text("¿Realmente deseea desenlazar el archivo?")
      : $('#mensaje_eliminar').text("¿Realmente deseea desenlazar los archivos?");
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
      console.log(archivos)
      this.archivos = archivos
    })
  }

  Carpetas(ruta) {
    this.Carpetas_Service.Obtener_Carpetas({ ruta: ruta }).subscribe(carpetas => {
      this.carpetas = carpetas
    })
  }

  Abrir_Carpeta(carpeta) {
    this.carpeta_actual.ruta_padre = carpeta.ruta_padre
    this.carpeta_actual.nombre_carpeta = carpeta.nombre_carpeta

    this.carpeta_lista.push({
      nombre_carpeta: this.carpeta_actual.nombre_carpeta,
      ruta_padre: this.carpeta_actual.ruta_padre
    })

    console.log("Carpeta Actual: ", this.carpeta_actual)
    console.log("Lista Carpetas: ", this.carpeta_lista)

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
      }

      this.Carpetas_Service.Guardar_Carpeta(carpeta).subscribe(res => {
        console.log(res)
        if (res.success) {
          $('#modal1').modal('close');
          Materialize.toast('Carpeta Agregada', 3000, 'green rounded')
          this.Carpetas(`${this.carpeta_actual.ruta_padre}\\${this.carpeta_actual.nombre_carpeta}`)
        }
        else {
          if (res.err.code == "23505") {
            Materialize.toast(`La carpeta \"${$('#nombre_carpeta').val()}\" ya existe`, 3000, 'red rounded')
          }
          else Materialize.toast("error desconocido", 3000, 'red rounded')
        }
      })
    }
  }

  Enlazar_Archivos() {
    if (this.upload_files.length != 0) {

      let archivos = this.upload_files.map(file => {
        return {
          realPath: file.path,
          nombre_archivo: file.name,
          nombre_carpeta: this.carpeta_actual.nombre_carpeta,
          ruta_padre: this.carpeta_actual.ruta_padre,
        };
      })


      this.Archivos_Service.Guardar_Archivo(archivos).subscribe(res => {
        var flag = false;
        for (let i = 0; i < res.arr.length; i++) {
          if (!res.arr[i].success) {
            if (res.arr[i].err.code == "23505") {
              Materialize.toast(`El archivo "${this.upload_files[i].name}" ya existe`, 7000, 'red rounded')
              flag = true;
            }
          }
          else {
            Materialize.toast(`El archivo "${this.upload_files[i].name}" se enlazo al proyecto exitosamente`, 3000, 'green rounded')
          }
        }
        this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta);
        (!flag) ? $('#modal1').modal('close') : null;
      })
    }
    else Materialize.toast('Debe elegir al menos un archivo', 3000, 'red rounded')
  }

  Abrir_Archivo(archivo) {
    this.Archivos_Service.Abrir_Archivo({ ruta: `${archivo.ruta_padre}\\${archivo.nombre_carpeta}\\\"${archivo.nombre_archivo}\"` }).subscribe(res => {
      Materialize.toast('Abriendo archivo', 3000, 'green rounded')
    })
  }

  Desenlazar_Archivo() {
    console.log(this.archivos_eliminar)
    this.Archivos_Service.Desenlazar_Archivo(this.archivos_eliminar).subscribe(res => {
      res.arr.forEach(e => {
        if (e.success) Materialize.toast(`El archivo ${e.nombre_archivo} se desenlazo correctamente`, 3000, 'green rounded')
        else Materialize.toast(`Error, el archivo ${e.nombre_archivo} no se desenlazo`, 5000, 'red rounded')

        this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
      });

    })
  }

  Expresion_Regular(event: any) {
    const pattern = /[a-zA-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  atras() {
    if (this.carpeta_lista.length != 1) {
      this.carpeta_actual.nombre_carpeta = this.carpeta_lista[this.carpeta_lista.length - 2].nombre_carpeta
      this.carpeta_actual.ruta_padre = this.carpeta_lista[this.carpeta_lista.length - 2].ruta_padre
      this.carpeta_lista.splice(-1, 1)
      console.log("Carpeta Actual: ", this.carpeta_actual)
      console.log("Lista Carpetas: ", this.carpeta_lista)
      this.Carpetas(this.carpeta_actual.ruta_padre + "\\" + this.carpeta_actual.nombre_carpeta)
      this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
    }
    else {
      (this.ingresarService.isGerente())
        ? this.router.navigate(["/gerente_bridge"], { relativeTo: this.route })
        : this.router.navigate(["/proyecto"], { relativeTo: this.route })
    }
  }

  delete_upload_file(name) {
    for (var i = 0; i < this.upload_files.length; i++) {
      if (this.upload_files[i].name == name) break
    }
    this.upload_files.splice(i, 1);
  }

  onChange(event: any) {
    let files = event.target.files

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
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  mostar_editar_nombre(num) {
    $("#t" + num).css("display", "none")
    $("#i" + num).css("display", "block")
  }

  editar_nombre(num, file) {
    var new_name = $("#input" + num).val()
    if (file.nombre_archivo != new_name) {
      file["new_name"] = new_name
      this.Archivos_Service.Cambiar_Nombre_Archivo({ file: file }).subscribe(res => {
        $("#i" + num).css("display", "none")
        $("#t" + num).css("display", "block")
        this.archivos[num]["nombre_archivo"] = new_name
      })
    }
    else {
      $("#i" + num).css("display", "none")
      $("#t" + num).css("display", "block")
    }
  }

  opciones() {
    let checkboxes = $('.chk:checkbox:checked')
    if (checkboxes.length != 0) {
      $('#opciones').modal('open');
    }
    else Materialize.toast('Debe elejir al menos un archivo para realizar esta acción', 3000, 'red rounded')
  }

  Confirmar_Mover_Archivos() {

    this.Carpetas_Service.Obtener_Arbol({ ruta: localStorage.getItem("ruta_proyecto") }).subscribe(res => {

      $('#mcontent').html("")
      var stack = []
      var arr = []
      stack.push(res.tree[0]);
      var cont = 0
      while (stack.length !== 0) {
        var node = stack.pop();

        if (node.ruta_padre == "") {
          $('#mcontent').append(`<ul class="collapsible" id="archivosx"></ul>`)
        }
        else {
          let padre = this.padre_id(node.ruta_padre)

          let html = ""

          let li = $("<li />")

          if (node.children.length == 0) {
            (this.carpeta_actual.nombre_carpeta == node.nombre_carpeta)
              ? html = `<div class="collapsible-header blue-text"><i class="material-icons">folder</i>${node.nombre_carpeta}</div>`
              : html = `<div class="collapsible-header"><i class="material-icons">folder</i>${node.nombre_carpeta}</div>`
          }
          else {
            (this.carpeta_actual.nombre_carpeta == node.nombre_carpeta)
              ? html = `<div class="collapsible-header blue-text"><i class="material-icons">folder</i>${node.nombre_carpeta}</div><div class="collapsible-body"><ul class="collapsible" id="${node.nombre_carpeta}x"></ul></div>`
              : html = `<div class="collapsible-header"><i class="material-icons">folder</i>${node.nombre_carpeta}</div><div class="collapsible-body"><ul class="collapsible" id="${node.nombre_carpeta}x"></ul></div>`
          }
          li.attr('id', `btnn${cont}`)
          li.append(html)
          $(`#${padre}x`).append(li)
          arr.push({ ruta_padre: node.ruta_padre, nombre_carpeta: node.nombre_carpeta })
        }

        for (var i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
        cont++
      }
      $('.collapsible').collapsible();

      $(".collapsible-header").addClass("active");
      $(".collapsible-body").css("display", "block");
      $(".expand-toggle").toggleClass("expanded");

      for (let i = 0; i < arr.length; i++) {
        if (this.carpeta_actual.nombre_carpeta != arr[i].nombre_carpeta) {
          document.getElementById(`btnn${i + 1}`)
            .addEventListener("click", function (e) {
              e.stopPropagation()
              $('#carpeta_destino').val(arr[i].nombre_carpeta)
              $('#carpeta_oculta').val(JSON.stringify(arr[i]))
            });
        }
        else {
          document.getElementById(`btnn${i + 1}`)
            .addEventListener("click", function (e) {
              e.stopPropagation()
            });
        }
      }

      $('#opciones').modal('close');
      $('#tree').modal('open');
    })

  }

  Mover_Archivos() {
    $('#tree').modal('close');
    this.archivos_mover = []
    let checkboxes = $('.chk:checkbox:checked')

    for (let i = 0; i < checkboxes.length; i++) {
      this.archivos_mover.push({
        ruta_padre: this.carpeta_actual.ruta_padre,
        nombre_carpeta: this.carpeta_actual.nombre_carpeta,
        nombre_archivo: checkboxes[i].attributes[4].nodeValue
      })
    }

    let destiny = JSON.parse($("#carpeta_oculta").val())

    this.Carpetas_Service.Mover_Archivos({ destiny: destiny, files: this.archivos_mover }).subscribe(res => {
      if (!res.success) {
        this.archivo_repetido = res
        $("#mensaje_archivo_repetido").text(`el destino ya tiene un archivo llamado "${res.nombre_archivo}"`)
        $('#archivo_repetido').modal('open');
      }
      else {
        this.flag = true
        this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
      }
    })
  }

  rem_omi(opcion) {
    if (opcion == "reemplazar") {
      this.archivos_mover[this.archivo_repetido.pos][opcion] = true
      this.archivos_mover.splice(0, this.archivo_repetido.pos);
    }
    else {
      this.archivos_mover.splice(0, this.archivo_repetido.pos + 1);
    }

    if (this.archivos_mover.length != 0) {
      let destiny = JSON.parse($("#carpeta_oculta").val())

      this.Carpetas_Service.Mover_Archivos({ destiny: destiny, files: this.archivos_mover }).subscribe(res => {
        if (!res.success) {
          console.log(res)
          this.archivo_repetido = res
          $("#mensaje_archivo_repetido").text(`el destino ya tiene un archivo llamado "${res.nombre_archivo}"`)
        }
        else {
          $('#archivo_repetido').modal('close');
          this.flag = true
          this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
        }
      })
    }
    else {
      $('#archivo_repetido').modal('close');
      this.flag = true
      this.Archivos(this.carpeta_actual.ruta_padre, this.carpeta_actual.nombre_carpeta)
    }

  }
}
