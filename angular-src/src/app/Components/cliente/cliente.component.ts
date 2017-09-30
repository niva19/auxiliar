import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service'
import {Router} from '@angular/router'
declare var jQuery:any;
declare var $:any;

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
  ax: any[];

  constructor(private CliService: ClientesService, private router: Router) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }


  getAll(){
    this.CliService.getAll().subscribe(data =>{
      this.ax = data;
    });
  }


  editClick(v: String){
    alert(v)
  }

  modal1(){
    $('#modal1').modal('open');
  }

  ClienteSubmit(){
      const cliente = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      cedula: this.cedula,
      telefono: this.telefono,
      correo: this.correo
    }
    
    
    this.CliService.GuardarCliente(cliente).subscribe(data =>{
      if(data.success){
        alert("correcto");
        this.getAll();
      }
      else{
        alert("incorrecto")
      }
    });
  }
}
