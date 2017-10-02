import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: String
  constructor() { }

  ngOnInit() {
    $('.modal').modal();
    $(".button-collapse").sideNav();
    
    if(localStorage.getItem('cedula')){
      this.username = localStorage.getItem('nombre')
    }
  }

  Anyone_In_Session(): Boolean{
    return (localStorage.getItem('cedula')) ? true : false
  }


}
