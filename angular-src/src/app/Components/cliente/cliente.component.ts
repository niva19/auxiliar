import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  nombre: String
  apellidos: String
  cedula: String
  direccion: String
  telefono: String
  correo: String
  switch: Boolean = true
  borrar: String//variable auxiliar utilizada para guardar la cedula cuando se proceda a borrar
  ax: any[];
  filtro: any
  parametro: String
  // @ViewChild('modal2Footer')
  // private modal2Footer: ElementRef


  @ViewChild('buscador')
  private buscador: ElementRef

  @ViewChild('modal2Footer')
  private modal2Footer: ElementRef

  @ViewChild('LabelNombre')
  private LabelNombre: ElementRef

  @ViewChild('LabelApellidos')
  private LabelApellidos: ElementRef

  @ViewChild('LabelCedula')
  private LabelCedula: ElementRef

  @ViewChild('Labeldireccion')
  private Labeldireccion: ElementRef

  @ViewChild('LabelCorreo')
  private LabelCorreo: ElementRef

  @ViewChild('LabelTelefono')
  private LabelTelefono: ElementRef

  @ViewChild('inputnombre')
  private inputnombre: ElementRef

  @ViewChild('inputapellidos')
  private inputapellidos: ElementRef

  @ViewChild('inputcedula')
  private inputcedula: ElementRef

  @ViewChild('inputdireccion')
  private inputdireccion: ElementRef

  @ViewChild('inputcorreo')
  private inputcorreo: ElementRef

  @ViewChild('intputtelefono')
  private intputtelefono: ElementRef



  constructor(private CliService: ClientesService, private router: Router, private renderer2: Renderer2) { }

  ngOnInit() {
    $('.modal').modal();
    // $("#buscar").change(function() {
    //   console.log("asd")
    // });
    this.getAll();
  }


  getAll() {
    this.CliService.getAll().subscribe(data => {
      console.log(data)
      this.ax = data;
    });
  }

  editClick(v: String) {
    alert(v)
  }

  LimpiarGuardar() {
    this.renderer2.removeClass(this.LabelNombre.nativeElement, "active")
    this.nombre = ""

    this.renderer2.removeClass(this.LabelApellidos.nativeElement, "active")
    this.apellidos = ""

    this.renderer2.removeClass(this.LabelCedula.nativeElement, "active")
    this.renderer2.removeAttribute(this.inputcedula.nativeElement, 'disabled');
    this.cedula = ""

    this.renderer2.removeClass(this.Labeldireccion.nativeElement, "active")
    this.direccion = ""

    this.renderer2.removeClass(this.LabelCorreo.nativeElement, "active")
    this.correo = ""

    this.renderer2.removeClass(this.LabelTelefono.nativeElement, "active")
    this.telefono = ""
  }

  modal1() {
    this.switch = true;
    this.LimpiarGuardar();
    $('#modal1').modal('open');
  }

  Editar(id) {
    const cliente = {
      cedula: id
    }
    this.CliService.getById(cliente).subscribe(data => {
      this.renderer2.setAttribute(this.LabelNombre.nativeElement, "class", "active")
      this.nombre = data.nombre

      this.renderer2.setAttribute(this.LabelApellidos.nativeElement, "class", "active")
      this.apellidos = data.apellidos

      this.renderer2.setAttribute(this.LabelCedula.nativeElement, "class", "active")
      this.renderer2.setAttribute(this.inputcedula.nativeElement, 'disabled', 'true');
      this.cedula = data.cedula

      this.renderer2.setAttribute(this.Labeldireccion.nativeElement, "class", "active")
      this.direccion = data.direccion

      this.renderer2.setAttribute(this.LabelCorreo.nativeElement, "class", "active")
      this.correo = data.correo

      this.renderer2.setAttribute(this.LabelTelefono.nativeElement, "class", "active")
      this.telefono = data.telefono

      this.switch = false
      $('#modal1').modal('open');
    });
  }

  Eliminar(id) {
    const cliente = {
      cedula: id
    }
    this.CliService.EliminarCliente(cliente).subscribe(data => {
      if (data.success) {
        this.getAll();
        $('#modal2').modal('close');
        Materialize.toast('El cliente se borró exitosamente', 3000, 'green rounded')
      }
      else {
        alert("algo salio mal")
      }
    });
  }

  Confirmar_Eliminar(id) {
    let button = this.renderer2.createElement('a');
    this.renderer2.removeChild(this.modal2Footer.nativeElement, this.modal2Footer.nativeElement.children[1]);
    // this.modal2Footer.nativeElement.innerHTML ='';

    this.renderer2.setAttribute(button, "class", "modal-action")
    this.renderer2.setAttribute(button, "class", "modal-close")
    this.renderer2.setAttribute(button, "class", "waves-effect")
    this.renderer2.setAttribute(button, "class", "waves-green")
    this.renderer2.setAttribute(button, "class", "btn-flat")
    let txt = this.renderer2.createText("Confirmar")
    this.renderer2.appendChild(button, txt)
    this.renderer2.listen(button, 'click', () => {
      this.Eliminar(id)
    })

    this.renderer2.appendChild(this.modal2Footer.nativeElement, button);

    console.log(id)
    $('#modal2').modal('open');
  }

  ClienteSubmit() {
    const cliente = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo
    }
    if (this.ValidateForm()) {
      if (this.switch) {//si el switch esta en true guarda
        this.CliService.GuardarCliente(cliente).subscribe(data => {
          if (data.success) {
            this.getAll();
            $('#modal1').modal('close');
            Materialize.toast('El cliente se guardó exitosamente', 3000, 'green rounded')
          }
          else {
            Materialize.toast('Error, cedula repetida', 3000, 'red rounded')
          }
        });
      }
      else {//si el switch esta en false edita
        this.CliService.EditarCliente(cliente).subscribe(data => {
          console.log(data);
          this.getAll();
          this.switch = true;
          $('#modal1').modal('close');
          Materialize.toast('El cliente se guardó exitosamente', 3000, 'green rounded')
        });
      }
    }
    else {
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

  ValidateForm() {
    if (this.inputnombre.nativeElement.value == '')
      return false
    if (this.inputapellidos.nativeElement.value == '')
      return false
    if (this.inputcedula.nativeElement.value == '')
      return false
    if (this.inputdireccion.nativeElement.value == '')
      return false
    if (this.inputcorreo.nativeElement.value == '')
      return false
    if (this.intputtelefono.nativeElement.value == '')
      return false

    return true
  }

  buscar() {
    this.parametro = ''
    if (this.buscador.nativeElement.value == "todos")
      this.getAll();
    else {
      this.filtro = this.buscador.nativeElement.value
      $('#modal3').modal('open');
    }
  }

  BuscarPorFiltro() {
    const FilPar = {
      parametro: this.parametro,
      filtro: this.filtro
    }

    this.CliService.BuscarCliente(FilPar).subscribe(data => {
      this.ax = data
      if (this.ax.length == 0)
        Materialize.toast('Sin resultados', 3000, 'red rounded')
      $('#modal3').modal('close');
    });
  }

}