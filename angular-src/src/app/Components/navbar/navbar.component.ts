import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'


declare var jQuery: any;
declare var $: any;

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
    $(".dropdown-button").dropdown();
  }

  anyone_In_Session(): Boolean {
    return (localStorage.getItem('cedula') && localStorage.getItem('privilegio')) ? true : false
  }

  updateName() {
    if (localStorage.getItem('cedula')) {
      this.username = localStorage.getItem('nombre');
      return true
    } else {
      return false
    }
  }

  Is_Privilegie_3(): Boolean {
    return (localStorage.getItem('privilegio') == '3') ? true : false
  }

  //PARA CERRAR SESION
  onLogoutClick() {
    Materialize.toast('Sesión cerrada correctamente', 4000, 'green rounded')
    localStorage.clear()
    this.router.navigate(['/ingresar'])
    return false
  }


}
