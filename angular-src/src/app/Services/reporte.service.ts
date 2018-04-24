import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReporteService {
  reporte: any

  constructor(private http: Http) { }

  /////////////////////////////////////////////REPORTES/////////////////////////////////////////////
  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/getreportes', { headers: headers }).map(res => res.json())
  }

  addReport(reporte) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/savereport', reporte, { headers: headers }).map(res => res.json())
  }
}
