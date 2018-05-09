import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArchivosService {

  constructor(private http: Http) { }

  Obtener_Archivos(carpeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/searchfiles', carpeta, { headers: headers }).map(res => res.json())
  }

  Abrir_Archivo(path){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/openfile', path, { headers: headers }).map(res => res.json())
  }

  Descargar_Archivo(path){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/downloadfile', path, { headers: headers }).map(res => res.json())
  }

  Guardar_Archivo(archivo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savefiles', archivo, { headers: headers }).map(res => res.json())
  }

  Desenlazar_Archivo(paths){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/unlink', paths, { headers: headers }).map(res => res.json())
  }

  Papelera(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getunlinkfiles', { headers: headers }).map(res => res.json())
  }

  Recuperar_Archivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/recoveryfile', file,{ headers: headers }).map(res => res.json())
  }

  Eliminar_Archivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletefile', file, { headers: headers }).map(res => res.json())
  }

  Verificar_Archivo_Repetidos(files){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/verifyduplicatefiles', files, { headers: headers }).map(res => res.json())
  }

  Cambiar_Nombre_Archivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/changefilename', file, { headers: headers }).map(res => res.json())
  }

}
