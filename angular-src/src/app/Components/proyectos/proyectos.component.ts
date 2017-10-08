import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // ################################## ATRIBUTOS ##################################
  nombreProyecto: String
  tipoProyecto: String
  tipoObra: String
  descripcion: String
  fechaInicio: String
  fechaFinaliza: String
  estado: String
  banco: String
  cliente: String
  profesionalResponsable: String
  switch: Boolean = true
  borrar: String//variable auxiliar utilizada para guardar la cedula cuando se proceda a borrar
  ax: any[];
  filtro: any
  parametro: String
  
  @ViewChild('buscador')
  private buscador: ElementRef

  @ViewChild('modal2Footer')
  private modal2Footer: ElementRef

  @ViewChild('LabelNombreProyecto')
  private LabelNombreProyecto: ElementRef

  @ViewChild('LabeltipoProyecto')
  private LabeltipoProyecto: ElementRef

  @ViewChild('LabeltipoObra')
  private LabeltipoObra: ElementRef

  @ViewChild('Labeldescripcion')
  private Labeldescripcion: ElementRef

  @ViewChild('LabelfechaInicio')
  private LabelfechaInicio: ElementRef

  @ViewChild('LabelfechaFinaliza')
  private LabelfechaFinaliza: ElementRef

  @ViewChild('Labelestado')
  private Labelestado: ElementRef

  @ViewChild('Labelbanco')
  private Labelbanco: ElementRef

  @ViewChild('LabelCliente')
  private LabelCliente: ElementRef

  @ViewChild('LabelprofesionalResponsable')
  private LabelprofesionalResponsable: ElementRef

  @ViewChild('inputnombreProyecto')
  private inputnombreProyecto: ElementRef

  @ViewChild('inputtipoProyecto')
  private inputtipoProyecto: ElementRef

  @ViewChild('inputtipoObra')
  private inputtipoObra: ElementRef

  @ViewChild('inputdescripcion')
  private inputdescripcion: ElementRef

  @ViewChild('inputfechaInicio')
  private inputfechaInicio: ElementRef

  @ViewChild('inputfechaFinaliza')
  private inputfechaFinaliza: ElementRef

  @ViewChild('inputestado')
  private inputestado: ElementRef

  @ViewChild('inputbanco')
  private inputbanco: ElementRef

  @ViewChild('inputcliente')
  private inputcliente: ElementRef

  @ViewChild('inputprofesionalResponsable')
  private inputprofesionalResponsable: ElementRef

  // ################################## METODOS ##################################

  // --------------------------------- CONSTRUCTOR ---------------------------------
  constructor(private ProyService: ProyectosService, private router: Router, private renderer2: Renderer2) { }

  ngOnInit() {
    $('.modal').modal();
    // $("#buscar").change(function() {
    //   console.log("asd")
    // });
    this.getAll();
  }

  getAll() {
    this.ProyService.getAll().subscribe(data => {
      console.log(data)
      this.ax = data;
    });
  }

  editClick(v: String) {
    alert(v)
  }
  // --------------------------------- LIMPIAR FORMULARIO ---------------------------------
  LimpiarGuardar(){
    this.renderer2.removeClass(this.LabelNombreProyecto.nativeElement,"active")
    this.nombreProyecto = ""

    this.renderer2.removeClass(this.LabeltipoProyecto.nativeElement,"active")
    this.tipoProyecto = ""

    this.renderer2.removeClass(this.LabeltipoObra.nativeElement,"active")
    this.tipoObra = ""

    this.renderer2.removeClass(this.Labeldescripcion.nativeElement,"active")
    this.descripcion = ""

    this.renderer2.removeClass(this.LabelfechaInicio.nativeElement,"active")
    this.fechaInicio = ""

    this.renderer2.removeClass(this.LabelfechaFinaliza.nativeElement,"active")
    this.fechaFinaliza = ""

    this.renderer2.removeClass(this.Labelestado.nativeElement,"active")
    this.estado = ""

    this.renderer2.removeClass(this.Labelbanco.nativeElement,"active")
    this.banco = ""

    this.renderer2.removeClass(this.LabelCliente.nativeElement,"active")
    this.cliente = ""

    this.renderer2.removeClass(this.LabelprofesionalResponsable.nativeElement,"active")
    this.profesionalResponsable = ""
  }

  modal1() {
    this.switch = true;
    this.LimpiarGuardar();
    $('#modal1').modal('open');
  }

  // --------------------------------- EDITAR PROYECTO ---------------------------------
  Editar(nom) {
    const proyecto = {
      nombreProyecto: nom
    }
    this.ProyService.getById(proyecto).subscribe(data => {
      this.renderer2.setAttribute(this.LabelNombreProyecto.nativeElement, "class", "active")
      this.nombreProyecto = data.nombreproyecto

      this.renderer2.setAttribute(this.LabeltipoProyecto.nativeElement, "class", "active")
      this.tipoProyecto = data.tipoproyecto

      this.renderer2.setAttribute(this.LabeltipoObra.nativeElement, "class", "active")
      this.tipoObra = data.tipoobra

      this.renderer2.setAttribute(this.Labeldescripcion.nativeElement, "class", "active")
      this.descripcion = data.descripcion

      this.renderer2.setAttribute(this.LabelfechaInicio.nativeElement, "class", "active")
      this.fechaInicio = data.fechainicio

      this.renderer2.setAttribute(this.LabelfechaFinaliza.nativeElement, "class", "active")
      this.fechaFinaliza = data.fechafinaliza

      this.renderer2.setAttribute(this.Labelestado.nativeElement, "class", "active")
      this.estado = data.estado

      this.renderer2.setAttribute(this.Labelbanco.nativeElement, "class", "active")
      this.banco = data.banco

      this.renderer2.setAttribute(this.LabelCliente.nativeElement, "class", "active")
      this.cliente = data.cliente

      this.renderer2.setAttribute(this.LabelprofesionalResponsable.nativeElement, "class", "active")
      this.profesionalResponsable = data.profresponsable

      this.switch = false
      $('#modal1').modal('open');
    }); 
  }
  // --------------------------------- ELIMINAR PROYECTO ---------------------------------
  Eliminar(nom){
    const proyecto = {
      nombreProyecto: nom
    }
    this.ProyService.EliminarProyecto(proyecto).subscribe(data => {
      if (data.success) {
        this.getAll();
        $('#modal2').modal('close');
      }
      else{
        alert("algo salio mal")
      }
    });
  }

  Confirmar_Eliminar(id){
    let button = this.renderer2.createElement('a');
    this.renderer2.removeChild(this.modal2Footer.nativeElement,this.modal2Footer.nativeElement.children[1]);
    // this.modal2Footer.nativeElement.innerHTML ='';

    this.renderer2.setAttribute(button,"class","modal-action")
    this.renderer2.setAttribute(button,"class","modal-close")
    this.renderer2.setAttribute(button,"class","waves-effect")
    this.renderer2.setAttribute(button,"class","waves-green")
    this.renderer2.setAttribute(button,"class","btn-flat")
    let txt = this.renderer2.createText("Confirmar")
    this.renderer2.appendChild(button,txt)
    this.renderer2.listen(button,'click',()=>{
      this.Eliminar(id)
    })

    this.renderer2.appendChild(this.modal2Footer.nativeElement,button);
    
    console.log(id)
    $('#modal2').modal('open');
  }
  // --------------------------------- SUBMIT PROYECTO ---------------------------------
  ProyectoSubmit() {
    const proyecto = {
      nombreProyecto: this.nombreProyecto,
      tipoProyecto: this.tipoProyecto,
      tipoObra: this.tipoObra,
      descripcion: this.descripcion,
      fechaInicio: this.fechaInicio,
      fechaFinaliza: this.fechaFinaliza,
      estado: this.estado,
      banco: this.banco,
      cliente: this.cliente,
      profesionalResponsable: this.profesionalResponsable
    }
    if(this.ValidateForm()){
      if (this.switch) {//si el switch esta en true guarda
        this.ProyService.GuardarProyecto(proyecto).subscribe(data => {
          if (data.success) {
            console.log(data);
            this.getAll();
            $('#modal1').modal('close');
          }
          else {
            Materialize.toast('Error, nombre repetido', 3000, 'red rounded')
          }
        });
      }
      else {//si el switch esta en false edita
        this.ProyService.EditarProyecto(proyecto).subscribe(data => {
          console.log(data);
          this.getAll();
          this.switch = true;
          $('#modal1').modal('close');
        });
      }
    }
    else{
      Materialize.toast('Complete los espacios, para continuar', 3000, 'red rounded')
    }
      
  }

  Only_Numbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  ValidateForm(){
    if(this.inputnombreProyecto.nativeElement.value == '')
      return false
    if(this.inputtipoProyecto.nativeElement.value == '')
      return false
    if(this.inputtipoObra.nativeElement.value == '')
      return false
    if(this.inputdescripcion.nativeElement.value == '')
      return false
    if(this.inputfechaInicio.nativeElement.value == '')
      return false
    if(this.inputfechaFinaliza.nativeElement.value == '')
      return false
    if(this.inputestado.nativeElement.value == '')
      return false
    if(this.inputbanco.nativeElement.value == '')
      return false
    if(this.inputcliente.nativeElement.value == '')
      return false
    if(this.inputprofesionalResponsable.nativeElement.value == '')
      return false

    return true
  }
 // --------------------------------- BUSCAR PROYECTO ---------------------------------
  buscar(){
    this.parametro = ''
    if(this.buscador.nativeElement.value == "todos")
      this.getAll();
    else{
      this.filtro = this.buscador.nativeElement.value
      $('#modal3').modal('open');
    }
  }

  BuscarPorFiltro(){
    const FilPar = {
      parametro: this.parametro,
      filtro: this.filtro
    }    
    this.ProyService.BuscarProyecto(FilPar).subscribe(data => {
      this.ax = data
      $('#modal3').modal('close');
    });
  }


}
