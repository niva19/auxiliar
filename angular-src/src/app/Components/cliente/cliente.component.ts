import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { Router } from '@angular/router'
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
  telefono: String
  correo: String
  switch: Boolean = true;
  ax: any[];

  @ViewChild('LabelNombre')
  private LabelNombre: ElementRef

  @ViewChild('LabelApellidos')
  private LabeApellidos: ElementRef

  @ViewChild('LabelCedula')
  private LabelCedula: ElementRef

  @ViewChild('LabelCorreo')
  private LabelCorreo: ElementRef

  @ViewChild('LabelTelefono')
  private LabelTelefono: ElementRef

  @ViewChild('inputcedula')
  private inputcedula: ElementRef

  constructor(private CliService: ClientesService, private router: Router, private renderer2: Renderer2) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }


  getAll() {
    this.CliService.getAll().subscribe(data => {
      this.ax = data;
    });
  }

  editClick(v: String) {
    alert(v)
  }

  modal1() {
    this.switch = true;
    $('#modal1').modal('open');
  }

  Editar(id) {
    const cliente = {
      cedula: id
    }
    this.CliService.getById(cliente).subscribe(data => {
      this.renderer2.setAttribute(this.LabelNombre.nativeElement, "class", "active")
      this.nombre = data.nombre

      this.renderer2.setAttribute(this.LabeApellidos.nativeElement, "class", "active")
      this.apellidos = data.apellidos

      this.renderer2.setAttribute(this.LabelCedula.nativeElement, "class", "active")
      this.renderer2.setAttribute(this.inputcedula.nativeElement, 'disabled', 'true');
      this.cedula = data.cedula

      this.renderer2.setAttribute(this.LabelCorreo.nativeElement, "class", "active")
      this.correo = data.correo

      this.renderer2.setAttribute(this.LabelTelefono.nativeElement, "class", "active")
      this.telefono = data.telefono

      this.switch = false
      $('#modal1').modal('open');
    });

  }

  Eliminar(id) {
    console.log(id)
  }

  ClienteSubmit() {

    const cliente = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      cedula: this.cedula,
      telefono: this.telefono,
      correo: this.correo
    }
    console.log(cliente);
    if (this.switch) {//si el switch esta en true guarda
      this.CliService.GuardarCliente(cliente).subscribe(data => {
        if (data.success) {
          alert("correcto");
          this.getAll();
        }
        else {
          alert("incorrecto");
        }
      });
    }
    else {//si el switch esta en false edita
      this.CliService.EditarCliente(cliente).subscribe(data => {
        console.log(data);
        this.getAll();
        this.switch = true;
        $('#modal1').modal('close');
        // if (data.success) {
        //   alert("correcto");
        //   this.getAll();
        // }
        // else {
        //   alert("incorrecto");
        // }
      });
    }
  }
}
