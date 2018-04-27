import { Component, OnInit } from '@angular/core';
import { ReporteService} from '../../services/reporte.service'
import { Router } from '@angular/router'
import * as Materialize from 'angular2-materialize'

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  ax: any[];

  constructor(private repService: ReporteService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    // init ax
    this.repService.getAll().subscribe(data =>{
      console.log(data)
      this.ax = data;
    });
  }

}
