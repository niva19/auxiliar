import { Component, OnInit } from '@angular/core';
import { IngresarService } from '../../services/ingresar.service'
import { Router } from '@angular/router'

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-privilegios',
  templateUrl: './privilegios.component.html',
  styleUrls: ['./privilegios.component.css']
})
export class PrivilegiosComponent implements OnInit {

  ax: any[];

  constructor(private ingService: IngresarService, private router: Router) { }

  ngOnInit() {
    $('.modal').modal();
    this.getAll();
  }

  getAll(){
    this.ingService.getAllEmployers().subscribe(data => {
        this.ax=data;
    });
  }

  modal(){
    $('#modal1').modal('open');
  }

}
