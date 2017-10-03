import { Component, OnInit } from '@angular/core'
declare var jQuery: any
declare var $: any
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: String
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    $('.modal').modal();
    $(".button-collapse").sideNav();

    if (localStorage.getItem('cedula')) {
      this.username = localStorage.getItem('nombre');
    }
  }

  Anyone_In_Session(): Boolean {
    return (localStorage.getItem('cedula')) ? true : false
  }

  //PARA CERRAR SESION
  onLogoutClick() {
    Materialize.toast('Sesión cerrada correctamente', 4000, 'green rounded')
    localStorage.clear()
    this.router.navigate(['/ingresar'])
    return false
  }
}
