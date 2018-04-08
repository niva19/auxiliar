import { Component, OnInit } from '@angular/core'
import { IngresarService } from '../../Services/ingresar.service'
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
    private ingresarService: IngresarService
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
    if (empleado.user == null || empleado.password == null) {
      Materialize.toast('Usuario o contraseña incorrecto, intente de nuevo', 3000, 'red rounded')
      return;
    }

    this.ingresarService.logear(empleado).subscribe(data => {
      if (data.success) {
        var access = 'uno'
        //logeado correctamente
        localStorage.setItem('cedula', data.data.cedula)
        localStorage.setItem('nombre', data.data.nombre)

        //PRIVILEGIOS
        if (data.data.privilegios == 1) {
          localStorage.setItem('privilegio', this.ingresarService.store('uno'))
        }
        else
          if (data.data.privilegios == 2)
            localStorage.setItem('privilegio', this.ingresarService.store('dos'))
          else
            if (data.data.privilegios == 3)
              localStorage.setItem('privilegio', this.ingresarService.store('tres'))
            else
              localStorage.setItem('privilegio', this.ingresarService.store('cero'))

        this.router.navigate(['/cliente'])
        Materialize.toast('Bienvenido', 4000, 'green rounded')
      } else {
        //logeado incorrecto
        Materialize.toast('Usuario o contraseña incorrecto, intente de nuevo', 4000, 'red rounded')
      }
      return;
    });
  }
}
