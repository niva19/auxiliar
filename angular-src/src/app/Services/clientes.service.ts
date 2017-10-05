import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientesService {
  cliente: any

  constructor(private http: Http) { }

  /////////////////////////////////////////////CLIENTES/////////////////////////////////////////////
  GuardarCliente(cliente) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/customers', cliente, { headers: headers }).map(res => res.json())
  }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/customers', { headers: headers }).map(res => res.json())
  }
  ///////////////////////////////////////////////////////////////////////////////////
  getById(cliente) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/getcustomer', cliente, { headers: headers }).map(res => res.json())
  }

  EditarCliente(cliente) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/customers', cliente, { headers: headers }).map(res => res.json())
  }
  ///////////////////////////////////////////////////////////////////////////////////
  EliminarCliente(cliente){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/deletecustomers', cliente, { headers: headers }).map(res => res.json())
  }

  BuscarCliente(FilPar){//Filtro y parametro
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/searchcustomers', FilPar, { headers: headers }).map(res => res.json())
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

}
