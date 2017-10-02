import { Component, OnInit } from '@angular/core';
import { IngresarService } from '../../services/ingresar.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  usuario: String
  contrasena: String

  constructor(private router: Router, private ingresarService: IngresarService) { }

  ngOnInit() {
  }

  login() {
    const empleado = {
      user: this.usuario,
      password: this.contrasena
    }
    // console.log(empleado);

    this.ingresarService.logear(empleado).subscribe(data => {
      if (data.success) { //success
        localStorage.setItem('cedula',data.data.cedula)
        localStorage.setItem('nombre',data.data.nombre)
        console.log(data);
      } else {
        console.log('Error');
        //alert("incorrecto");
      }
    });
  }
}
