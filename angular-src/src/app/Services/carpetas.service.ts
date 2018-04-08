import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarpetasService {

  constructor(private http: Http) { }

  Obtener_Carpetas(proyecto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getfolders', proyecto, { headers: headers }).map(res => res.json())
  }

  Guardar_Carpeta(carpeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savefolder', carpeta, { headers: headers }).map(res => res.json())
  }

}
