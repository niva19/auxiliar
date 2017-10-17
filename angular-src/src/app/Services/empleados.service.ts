import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpleadosService {
  empleado: any
  
    constructor(private http: Http) { }
  
    /////////////////////////////////////////////EMPLEADOS/////////////////////////////////////////////
    GuardarEmpleado(empleado) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/saveemployee', empleado, { headers: headers }).map(res => res.json())
    }
  
    getAll() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/api/getemployees', { headers: headers }).map(res => res.json())
    }

    getCNA() {//obtener Empleados solo con Cedula, Nombre y apellidos (CNA)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/api/employeescna', { headers: headers }).map(res => res.json())
    }

    ///////////////////////////////////////////////////////////////////////////////////
    getById(empleado) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/getemployee', empleado, { headers: headers }).map(res => res.json())
    }
  
    EditarEmpleado(empleado) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://localhost:3000/api/editemployee', empleado, { headers: headers }).map(res => res.json())
    }
    ///////////////////////////////////////////////////////////////////////////////////
    EliminarEmpleado(empleado){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/deleteemployee', empleado, { headers: headers }).map(res => res.json())
    }
  
    BuscarEmpleado(FilPar){//Filtro y parametro
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/searchemployee', FilPar, { headers: headers }).map(res => res.json())
    }
  
    ///////////////////////////////////////////////////////////////////////////////////////////////////

}
