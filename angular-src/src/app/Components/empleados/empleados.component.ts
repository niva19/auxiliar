import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  nombre: String
  apellidos: String
  dni: String
  direccion: String
  telefono: String
  correo: String
  usuario: String
  contrasena: String
  isGerente: boolean
  fechaEntrada: String
  fechaSalida: String
  tipoSalario: String
  montoSalario: String
  switch: Boolean = true
  borrar: String//variable auxiliar utilizada para guardar la cedula cuando se proceda a borrar
  ax: any[];
  filtro: any
  parametro: String
  privilegios: string


  @ViewChild('empleadoSeleccionado')
  private empleadoSeleccionado: ElementRef

  @ViewChild('buscador')
  private buscador: ElementRef

  @ViewChild('modal2Footer')
  private modal2Footer: ElementRef

  @ViewChild('modal4Footer')
  private modal4Footer: ElementRef

  @ViewChild('LabelNombre')
  private LabelNombre: ElementRef

  @ViewChild('LabelApellidos')
  private LabelApellidos: ElementRef

  @ViewChild('LabelDni')
  private LabelDni: ElementRef

  @ViewChild('Labeldireccion')
  private Labeldireccion: ElementRef

  @ViewChild('LabelCorreo')
  private LabelCorreo: ElementRef

  @ViewChild('LabelTelefono')
  private LabelTelefono: ElementRef

  @ViewChild('LabelPrivilegios')
  private LabelPrivilegios: ElementRef

  @ViewChild('LabelUsuario')
  private LabelUsuario: ElementRef

  @ViewChild('LabelContrasena')
  private LabelContrasena: ElementRef

  //added
  @ViewChild('LabelIsGerente')
  private LabelIsGerente: ElementRef

  @ViewChild('LabelFechaEntrada')
  private LabelFechaEntrada: ElementRef

  @ViewChild('LabelFechaSalida')
  private LabelFechaSalida: ElementRef

  @ViewChild('LabelTipoSalario')
  private LabelTipoSalario: ElementRef

  @ViewChild('LabelMontoSalario')
  private LabelMontoSalario: ElementRef
  //end

  @ViewChild('inputnombre')
  private inputnombre: ElementRef

  @ViewChild('inputPrivilegio')
  private inputPrivilegio: ElementRef

  @ViewChild('inputapellidos')
  private inputapellidos: ElementRef

  @ViewChild('inputDni')
  private inputDni: ElementRef

  @ViewChild('inputdireccion')
  private inputdireccion: ElementRef

  @ViewChild('inputcorreo')
  private inputcorreo: ElementRef

  @ViewChild('inputtelefono')
  private inputTelefono: ElementRef

  @ViewChild('inputprivilegios')
  private inputPrivilegios: ElementRef

  @ViewChild('inputusuario')
  private inputUsuario: ElementRef

  @ViewChild('inputcontrasena')
  private inputContrasena: ElementRef

  //added input
  @ViewChild('inputIsGerente')
  private inputIsGerente: ElementRef

  @ViewChild('inputFechaEntrada')
  private inputFechaEntrada: ElementRef

  @ViewChild('inputFechaSalida')
  private inputFechaSalida: ElementRef

  @ViewChild('inputTipoSalario')
  private inputTipoSalario: ElementRef

  @ViewChild('inputMontoSalario')
  private inputMontoSalario: ElementRef

  //end

  constructor(private EmpService: EmpleadosService, private router: Router, private renderer2: Renderer2) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }

  getAll() {
    this.EmpService.getAll().subscribe(data => {
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

    this.renderer2.removeClass(this.LabelDni.nativeElement, "active")
    this.renderer2.removeAttribute(this.inputDni.nativeElement, 'disabled');
    this.dni = ""

    this.renderer2.removeClass(this.Labeldireccion.nativeElement, "active")
    this.direccion = ""

    this.renderer2.removeClass(this.LabelCorreo.nativeElement, "active")
    this.correo = ""

    this.renderer2.removeClass(this.LabelTelefono.nativeElement, "active")
    this.telefono = ""

    this.renderer2.removeClass(this.LabelUsuario.nativeElement, "active")
    this.renderer2.removeAttribute(this.inputUsuario.nativeElement, 'disabled');
    this.usuario = ""

    this.renderer2.removeClass(this.LabelContrasena.nativeElement, "active")
    this.contrasena = ""

    //new
    this.renderer2.removeClass(this.LabelIsGerente.nativeElement, "active")
    this.isGerente = false

    this.renderer2.removeClass(this.LabelFechaEntrada.nativeElement, "active")
    this.fechaEntrada = ""

    this.renderer2.removeClass(this.LabelFechaSalida.nativeElement, "active")
    this.fechaSalida = ""

    this.renderer2.removeClass(this.LabelTipoSalario.nativeElement, "active")
    this.tipoSalario = ""

    this.renderer2.removeClass(this.LabelMontoSalario.nativeElement, "active")
    this.montoSalario = ""
    //end
  }

  modal1() {
    this.switch = true;
    this.LimpiarGuardar();
    $('#modal1').modal('open');
  }

  Limpiar() {
    this.renderer2.removeClass(this.LabelNombre.nativeElement, "active")
    this.empleadoSeleccionado.nativeElement.innerHTML = ""
    this.privilegios = ""
  }

  Editar(id) {
    const empleado = {
      cedula: id
    }
    this.EmpService.getById(empleado).subscribe(data => {
      this.renderer2.setAttribute(this.LabelNombre.nativeElement, "class", "active")
      this.nombre = data.nombre

      this.renderer2.setAttribute(this.LabelApellidos.nativeElement, "class", "active")
      this.apellidos = data.apellidos

      this.renderer2.setAttribute(this.LabelDni.nativeElement, "class", "active")
      this.renderer2.setAttribute(this.inputDni.nativeElement, 'disabled', 'true');
      this.dni = data.cedula

      this.renderer2.setAttribute(this.Labeldireccion.nativeElement, "class", "active")
      this.direccion = data.direccion

      this.renderer2.setAttribute(this.LabelTelefono.nativeElement, "class", "active")
      this.telefono = data.telefono

      this.renderer2.setAttribute(this.LabelCorreo.nativeElement, "class", "active")
      this.correo = data.correo

      this.renderer2.setAttribute(this.LabelUsuario.nativeElement, "class", "active")
      this.renderer2.setAttribute(this.inputUsuario.nativeElement, 'disabled', 'true');
      this.usuario = data.usuario

      this.renderer2.setAttribute(this.LabelContrasena.nativeElement, "class", "active")
      this.contrasena = data.contrasena

      this.switch = false
      $('#modal1').modal('open');
    });
  }

  Eliminar(id) {
    const empleado = {
      cedula: id
    }
    this.EmpService.EliminarEmpleado(empleado).subscribe(data => {
      if (data.success) {
        this.getAll();
        $('#modal2').modal('close');
        Materialize.toast('El empleado se borró exitosamente', 3000, 'green rounded')
      }
      else {
        Materialize.toast('Algo salio mal', 3000, 'red rounded')
      }
    });
  }

  Confirmar_Eliminar(id) {
    let button = this.renderer2.createElement('a');
    this.renderer2.removeChild(this.modal2Footer.nativeElement, this.modal2Footer.nativeElement.children[1]);
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

  Cambio_Privilegios(id) {
    //clean
    this.Limpiar()
    const empleado = {
      cedula: id
    }
    this.EmpService.getById(empleado).subscribe(data => {
      //init
      let button = this.renderer2.createElement('a')
      this.renderer2.removeChild(this.modal4Footer.nativeElement, this.modal4Footer.nativeElement.children[1])
      this.renderer2.setAttribute(button, "class", "modal-action")
      this.renderer2.setAttribute(button, "class", "modal-close")
      this.renderer2.setAttribute(button, "class", "waves-effect")
      this.renderer2.setAttribute(button, "class", "waves-green")
      this.renderer2.setAttribute(button, "class", "btn-flat")
      let txt = this.renderer2.createText("Confirmar")

      this.renderer2.appendChild(button, txt)
      this.renderer2.appendChild(this.modal4Footer.nativeElement, button);

      this.renderer2.setAttribute(this.LabelNombre.nativeElement, "class", "active")
      this.empleadoSeleccionado.nativeElement.innerHTML = data.nombre + " " + data.apellidos
      //event
      this.renderer2.listen(button, 'click', () => {
        this.Actualiza_Privilegio(data)
      })
      $('#modal4').modal('open');
    });
  }

  Actualiza_Privilegio(data) {
    console.log(data)
    if (this.ValidateFormPrivilegios()) {
      data.privilegios = this.privilegios
      this.EmpService.EditarEmpleado(data).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.getAll();
          this.switch = true;
          $('#modal4').modal('close');
          Materialize.toast('Se aplicaron los privilegios exitosamente', 3000, 'green rounded')
        }
        else {
          Materialize.toast('Error, algo ha ocurrido', 3000, 'red rounded')
        }
      });
    }
    else {
      Materialize.toast('Complete los espacios, para continuar', 3000, 'red rounded')
    }
  }

  EmpleadoSubmit() {
    const empleado = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      cedula: this.dni,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      usuario: this.usuario,
      contrasena: this.contrasena
    }
    if (this.ValidateForm()) {
      if (this.switch) {//si el switch esta en true guarda
        this.EmpService.GuardarEmpleado(empleado).subscribe(data => {
          if (data.success) {
            this.getAll();
            $('#modal1').modal('close');
            Materialize.toast('El empleado se guardó exitosamente', 3000, 'green rounded')
          }
          else {
            Materialize.toast('Error, cedula repetida', 3000, 'red rounded')
          }
        });
      }
      else {//si el switch esta en false edita
        this.EmpService.EditarEmpleado(empleado).subscribe(data => {
          console.log(data);
          this.getAll();
          this.switch = true;
          $('#modal1').modal('close');
          Materialize.toast('El empleado se guardó exitosamente', 3000, 'green rounded')
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
    if (this.inputDni.nativeElement.value == '')
      return false
    if (this.inputdireccion.nativeElement.value == '')
      return false
    if (this.inputTelefono.nativeElement.value == '')
      return false
    if (this.inputcorreo.nativeElement.value == '')
      return false
    if (this.inputUsuario.nativeElement.value == '')
      return false
    if (this.inputContrasena.nativeElement.value == '')
      return false
      //should be checked
    if (this.inputIsGerente.nativeElement.value == false)
      return false
    if(this.inputFechaEntrada.nativeElement.value == '')
      return false
    if(this.inputFechaSalida.nativeElement.value == '')
      return false
    if(this.inputTipoSalario.nativeElement.value == '')
      return false
    if(this.inputMontoSalario.nativeElement.value == '')
      return false
    return true
  }

  ValidateFormPrivilegios() {
    if (this.inputPrivilegios.nativeElement.value == '')
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
    this.EmpService.BuscarEmpleado(FilPar).subscribe(data => {
      this.ax = data
      if (this.ax.length == 0)
        Materialize.toast('Sin resultados', 3000, 'red rounded')
      $('#modal3').modal('close');
    });
  }

  //init
  ngAfterViewInit() {
    $('.collapsible').collapsible();
  }

}
