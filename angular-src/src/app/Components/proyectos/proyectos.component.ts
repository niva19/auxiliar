import { Component, OnInit, ViewChild, ElementRef, Renderer2, Renderer } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service'
import { ClientesService } from '../../services/clientes.service'
import { EmpleadosService } from '../../services/empleados.service'
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
  estado: String
  banco: String
  switch: Boolean = true
  detalles: any[] = []
  ax: any[]
  // = [{nombre: "juan"}, {nombre: "Rocio"}, {nombre: "Pedro"}]
  filtro: any
  parametro: String
  
  @ViewChild('dropdownEmpleados')
  private dropdownEmpleados: ElementRef

  @ViewChild('dropdownClientes')
  private dropdownClientes: ElementRef

  @ViewChild('buscador')
  private buscador: ElementRef

  @ViewChild('modal2Footer')
  private modal2Footer: ElementRef

  @ViewChild('LabelNombreProyecto')
  private LabelNombreProyecto: ElementRef

  @ViewChild('Labeldescripcion')
  private Labeldescripcion: ElementRef

  @ViewChild('Labelbanco')
  private Labelbanco: ElementRef

  @ViewChild('LabelFechaInicio')
  private LabelFechaInicio: ElementRef

  @ViewChild('LabelFechaFinaliza')
  private LabelFechaFinaliza: ElementRef

  @ViewChild('inputnombreProyecto')
  private inputnombreProyecto: ElementRef

  @ViewChild('inputdescripcion')
  private inputdescripcion: ElementRef

  @ViewChild('inputbanco')
  private inputbanco: ElementRef


  // ################################## METODOS ##################################

  // --------------------------------- CONSTRUCTOR ---------------------------------
  constructor(private ProyService: ProyectosService,
              private clientesService: ClientesService,
              private empleadosService: EmpleadosService, 
              private router: Router, 
              private renderer2: Renderer2,
              private renderer: Renderer) { }

  ngOnInit() {
    $('.modal').modal();
    $(".js-example-basic-single").select2();
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

    this.getAll();
    this.DropdownClientes();
    this.DropdownEmpleados();
  }

  getAll() {
    this.ProyService.getAll().subscribe(data => {
      console.log(data)
      this.ax = data;
    });
  }

  DropdownClientes(){
    this.clientesService.getCNA().subscribe(listaCliente =>{

      //se crea la opcion por default, no se puede quemar en el html
      let option = this.renderer2.createElement('option')
      this.renderer2.appendChild(option,this.renderer2.createText("Cliente asignado"))
      this.renderer2.setProperty(option,"disabled", "true")
      this.renderer2.setProperty(option,"selected", "true")
      this.renderer.setElementProperty(option,"value", '')
      this.renderer2.appendChild(this.dropdownClientes.nativeElement,option)

      //se crea las opciones con los clientes en el dropdown
      listaCliente.forEach(e => {
        option = this.renderer2.createElement('option')
        this.renderer2.appendChild(option,this.renderer2.createText(`${e.nombre} ${e.apellidos} ${e.cedula}`))
        this.renderer.setElementProperty(option,"value", e.cedula)
        this.renderer2.appendChild(this.dropdownClientes.nativeElement,option)
      });
    })
  }

  DropdownEmpleados(){
    this.empleadosService.getCNA().subscribe(listaEmpleados =>{

      //se crea la opcion por default, no se puede quemar en el html
      let option = this.renderer2.createElement('option')
      this.renderer2.appendChild(option,this.renderer2.createText("Profesional Responsable"))
      this.renderer2.setProperty(option,"disabled", "true")
      this.renderer2.setProperty(option,"selected", "true")
      this.renderer.setElementProperty(option,"value", '')
      this.renderer2.appendChild(this.dropdownEmpleados.nativeElement,option)

      //se crea las opciones con los clientes en el dropdown
      listaEmpleados.forEach(e => {
        option = this.renderer2.createElement('option')
        this.renderer2.appendChild(option,this.renderer2.createText(`${e.nombre} ${e.apellidos} ${e.cedula}`))
        this.renderer.setElementProperty(option,"value", e.cedula)
        this.renderer2.appendChild(this.dropdownEmpleados.nativeElement,option)
      });
    })
  }

  editClick(v: String) {
    alert(v)
  }
  // --------------------------------- LIMPIAR FORMULARIO ---------------------------------
  LimpiarGuardar(){
    // this.renderer2.removeClass(this.LabelNombreProyecto.nativeElement,"active")
    // this.nombreProyecto = ""

    // this.renderer2.removeClass(this.Labeldescripcion.nativeElement,"active")
    // this.descripcion = ""

    // this.renderer2.removeClass(this.Labelbanco.nativeElement,"active")
    // this.banco = ""
    $('#FormAgregar').trigger("reset");
    $('#ddClientes').val('').trigger('change')
    $('#ddEmpleados').val('').trigger('change')
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

      this.renderer2.setAttribute(this.Labeldescripcion.nativeElement, "class", "active")
      this.descripcion = data.descripcion

      this.renderer2.setAttribute(this.Labelbanco.nativeElement, "class", "active")
      this.banco = data.banco

      $(`#ddTipoProyecto option[value='${data.tipoproyecto}']`).prop('selected', true);

      $(`#ddTipoObra option[value='${data.tipoobra}']`).prop('selected', true);

      $(`#ddEstado option[value='${data.estado}']`).prop('selected', true);

      $('#ddClientes').val(data.cliente).trigger('change')

      $('#ddEmpleados').val(data.profresponsable).trigger('change')

      this.renderer2.setAttribute(this.LabelFechaInicio.nativeElement, "class", "active")
      $('#fechaInicio').val(data.fechainicio)

      this.renderer2.setAttribute(this.LabelFechaFinaliza.nativeElement, "class", "active")
      $('#fechaFinaliza').val(data.fechafinaliza)

      console.log(data)

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
      fechaInicio: $('#fechaInicio').val(),
      fechaFinaliza: $('#fechaFinaliza').val(),
      estado: this.estado,
      banco: this.banco,
      cliente: $('select[name=state]').val(),
      profesionalResponsable: $('select[name=state2]').val(),
    }
    // if(this.ValidateForm()){
    //   console.log(proyecto)
    // }
    // else Materialize.toast('Complete los espacios, para continuar', 3000, 'red rounded')

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
    if(this.tipoProyecto == '')
      return false
    if(this.tipoObra == '')
      return false
    if(this.inputdescripcion.nativeElement.value == '')
      return false
    if($('#fechaInicio').val() == '')
      return false
    if($('#fechaFinaliza').val() == '')
      return false
    if(this.estado == '')
      return false
    if(this.inputbanco.nativeElement.value == '')
      return false
    if($('select[name=state]').val() == '')
      return false
    // if(this.inputprofesionalResponsable.nativeElement.value == '')
    //   return false

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

  Detalles(v){
    console.log(v)
    let detalle = {
      banco: v.banco,
      cliente: v.cliente,
      fechafinaliza: v.fechafinaliza,
      profresponsable: v.profresponsable,
      tipoobra: v.tipoobra,
      descripcion: v.descripcion
    }
    this.detalles = [detalle]
    $('#modal4').modal('open');
  }
  // prueba(){
  //   // let ax = $('select[name=state]').val()
  //   let ax = $('#fechaInicio').val();
  //   console.log(ax)
  // }

}



