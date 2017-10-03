import { Component, OnInit } from '@angular/core'
import { IngresarService } from '../../services/ingresar.service'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  usuario: String
  contrasena: String

  constructor(
    private router: Router,
    private ingresarService: IngresarService,
  ) { }

  ngOnInit() {
  }

  //Ingreso del usuario
  login() {
    const empleado = {
      user: this.usuario,
      password: this.contrasena
    }
    //si no esta completo el form
    // #######################################################################
    // ################### FALTAN LOS N ESPACIOS EN BLANCO####################
    // #######################################################################
    if (empleado.user == null || empleado.password == null){
      Materialize.toast('Complete los espacios, para continuar', 3000, 'red rounded')
      return;
    }

    this.ingresarService.logear(empleado).subscribe(data => {
      if (data.success) {
        //logeado correctamente
        localStorage.setItem('cedula', data.data.cedula)
        localStorage.setItem('nombre', data.data.nombre)
        this.router.navigate(['/inicio'])
        Materialize.toast('Validación completada, bienvenido', 4000, 'green rounded')
      } else {
        //logeado incorrecto
        Materialize.toast('Usuario o contraseña incorrecto, intente de nuevo', 4000, 'red rounded')
      }
      return;
    });
  }
}
