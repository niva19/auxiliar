import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';    



@Injectable()
export class ClienteArchivosService {
  
  Reemplazar_Archivos(files) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/replacecustomerfile', files, { headers: headers }).map(res => res.json()) 
  }
  Recuperar_Archivo(files) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/recoverycustomerfile', files, { headers: headers }).map(res => res.json()) 
  }
  Eliminar_Archivo(files){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletecustomerfile', files, { headers: headers }).map(res => res.json())
  }
  Papelera() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getunlinkcustomerfiles', { headers: headers }).map(res => res.json())
  }
  Desenlazar_Archivo(paths){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/unlinkcustomerfiles', paths, { headers: headers }).map(res => res.json())
  }
  
  Obtener_Archivos(archivo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getcustomerfiles', archivo, { headers: headers }).map(res => res.json())
  }

  Guardar_Archivo(archivo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savecustomerfiles', archivo, { headers: headers }).map(res => res.json())
  }

  Cambiar_Nombre_Archivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/changecustomerfilename', file, { headers: headers }).map(res => res.json())
  }

  Descargar_Archivo(files){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/downloadfile', files, { headers: headers }).map(res => res.json())
  }

  Abrir_Archivo(path){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/openfile', path, { headers: headers }).map(res => res.json())
  }

  Obtener_Ruta(val){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getpath', val, { headers: headers }).map(res => res.json())
  }

  constructor(private http: Http) { }
}
