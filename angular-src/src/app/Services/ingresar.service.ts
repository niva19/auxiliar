import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IngresarService {
  empleado: any

  constructor(private http: Http) { }

  logear(empleado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/empleados', empleado, { headers: headers }).map(res => res.json())
  }

  getAllEmployers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getemployers', { headers: headers }).map(res => res.json())
  }

}
