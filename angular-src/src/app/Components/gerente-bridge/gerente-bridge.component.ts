import { Component, OnInit } from '@angular/core';
import { CarpetasService } from '../../services/carpetas.service'
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-gerente-bridge',
  templateUrl: './gerente-bridge.component.html',
  styleUrls: ['./gerente-bridge.component.css']
})
export class GerenteBridgeComponent implements OnInit {

  carpetas: any[]

  constructor(private Carpetas_Service: CarpetasService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }

  ngOnInit() {
    // this.data.current_ruta_proyecto.subscribe(ruta_proyecto =>{
    //   this.Carpetas(ruta_proyecto);
    // })
    this.Carpetas(localStorage.getItem("ruta_proyecto"));
  }

  Carpetas(ruta) {
    this.Carpetas_Service.Obtener_Carpetas({ ruta: ruta }).subscribe(carpetas => {
      this.carpetas = carpetas
    })
  }

  Abrir_Carpeta(carpeta) {
    localStorage.setItem("carpeta_actual",JSON.stringify(carpeta))
    // localStorage.setItem("ruta_proyecto", `${carpeta.ruta_padre}"\\"${carpeta.nombre_carpeta}`);
    this.router.navigate(["/archivos"], { relativeTo: this.route })
  }

  atras(){
    this.router.navigate(["/proyecto"], { relativeTo: this.route })
  }

}
