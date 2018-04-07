import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProyectosService {
  proyecto: any

  constructor(private http: Http) { }

  /////////////////////////////////////////////PROYECTOS/////////////////////////////////////////////
  GuardarProyecto(proyecto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/saveproject', proyecto, { headers: headers }).map(res => res.json())
  }

  getAll(cliente) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getprojects', cliente, { headers: headers }).map(res => res.json())
  }
  ///////////////////////////////////////////////////////////////////////////////////
  getById(proyecto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getproject', proyecto, { headers: headers }).map(res => res.json())
  }

  EditarProyecto(proyecto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/editproject', proyecto, { headers: headers }).map(res => res.json())
  }
  ///////////////////////////////////////////////////////////////////////////////////
  EliminarProyecto(proyecto){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deleteproject', proyecto, { headers: headers }).map(res => res.json())
  }

  BuscarProyecto(FilPar){//Filtro y parametro
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/searchproject', FilPar, { headers: headers }).map(res => res.json())
  }

  BuscarArchivos(proyecto){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/searchfiles', proyecto, { headers: headers }).map(res => res.json())
  }

  GuardarArchivo(realPath){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savefiles', realPath, { headers: headers }).map(res => res.json())
  }

  AbrirArchivo(paths){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/openfile', paths, { headers: headers }).map(res => res.json())
  }

  EliminarArchivo(paths){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletefile', paths, { headers: headers }).map(res => res.json())
  }

  DesenlazarArchivo(paths){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/unlink', paths, { headers: headers }).map(res => res.json())
  }

  GetUnlinkFiles(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getunlinkfiles', { headers: headers }).map(res => res.json())
  }

  RecuperarArchivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/recoveryfile', file,{ headers: headers }).map(res => res.json())
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////

}
