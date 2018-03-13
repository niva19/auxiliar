import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
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
  file: String

  @ViewChild('abc')
  private abc: ElementRef

  constructor(private ProyService: ProyectosService) { }

  ngOnInit() {
    $('.modal').modal();
    $('.dropdown-button').dropdown();
    this.Archivos(localStorage.getItem("nombre_proyecto"));
  }

  modal1(){
    $('#modal1').modal('open');
  }

  Confirmar_eliminar(nombre){
    $('#eliminar').modal('open');
    this.file = nombre
  }

  Archivos(nombre){
    
        function invertir(cadena) {
          var x = cadena.length;
          var cadenaInvertida = "";
         
          while (x>=0) {
            cadenaInvertida += cadena.charAt(x);
            x--;
          }
          return cadenaInvertida;
        }
    
    
        this.ProyService.BuscarArchivos({nombre: nombre}).subscribe(files =>{
          console.log(files)
          files.forEach(val =>{
            for(var f1 in val){
              if(f1 != "publico"){
                var extension = "";
                for(var i=val[f1].length - 1; i > -1; i--){
                  if(val[f1].charAt(i) != '.') extension += val[f1].charAt(i)
                  else break
                }
                val["extension"] = invertir(extension)  
              }
            }
          })
     
          this.archivos = files
          this.pkProyecto = nombre
          // console.log(files)
        })
      }
    
      Enlazar_Archivos(){
        if(this.abc.nativeElement.files[0]){
          var realPath = this.abc.nativeElement.files[0].path;
          
          let estado;
          ($('input:radio[name=group1]:checked').val() == "publico") ? estado = true
          : estado = false
            
          let path = {
            realPath: realPath,
            estado: estado,
            name: $('#fl2').val(),
            proyect: this.pkProyecto

          }
          
          console.log(path)
          this.ProyService.GuardarArchivo(path).subscribe(res =>{
            if(res.error){
              Materialize.toast('El archivo ya esta enlazado al proyecto', 3000, 'red rounded')
            }
            else{
              this.Archivos(this.pkProyecto)
              Materialize.toast('El archivo se enlazo al proyecto exitosamente', 3000, 'green rounded')
              $('#modal1').modal('close');
            }
          })
        }
        else Materialize.toast('Debe elegir un archivo', 3000, 'red rounded')
      }
    
      Abrir_Archivo(file_name, publico){
        this.ProyService.AbrirArchivo({pkproyecto: this.pkProyecto, file: file_name, publico: publico}).subscribe(res =>{
          Materialize.toast('Abriendo archivo', 3000, 'green rounded')
        })
      }
    
      Desenlazar_Archivo(){
        this.ProyService.DesenlazarArchivo({pkproyecto: this.pkProyecto, file: this.file}).subscribe(res =>{
          Materialize.toast('El archivo se desenlazo correctamente', 3000, 'green rounded')
          this.Archivos(this.pkProyecto)
          console.log(res)
        })
      }
    
      Eliminar_Archivo(file_name){
        this.ProyService.EliminarArchivo({pkproyecto: this.pkProyecto, file: file_name}).subscribe(res =>{
          Materialize.toast('El archivo se elimino exitosamente', 3000, 'green rounded')
          this.Archivos(this.pkProyecto)
          console.log(res)
        })
      }

}
