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
  
  Eliminar_Carpeta(carpeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletefolder', carpeta, { headers: headers }).map(res => res.json())
  }

  Obtener_Arbol(carpeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getfoldertree', carpeta, { headers: headers }).map(res => res.json())
  }

  Mover_Archivos(values){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/movefiles', values, { headers: headers }).map(res => res.json())
  }

  Editar_nombre_Carpeta(values){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/editfoldername', values, { headers: headers }).map(res => res.json())
  }

  Papelera(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getunlinkfolders', { headers: headers }).map(res => res.json())
  }

  Eliminar_Carpeta_Permanentemente(carpeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletepermanentfolder', carpeta, { headers: headers }).map(res => res.json())
  }

  Recuperar_Carpetas(carpetas){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/recoveryfolders', carpetas, { headers: headers }).map(res => res.json())
  }
}
