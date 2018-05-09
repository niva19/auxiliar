import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';    



@Injectable()
export class ClienteArchivosService {

  constructor(private http: Http) { }


  Guardar_Archivo(archivo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savefiles', archivo, { headers: headers }).map(res => res.json())
  }

  Cambiar_Nombre_Archivo(file){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/changefilename', file, { headers: headers }).map(res => res.json())
  }

  Descargar_Archivo(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  Abrir_Archivo(arg0: any): any {
    throw new Error("Method not implemented.");
  }
}
