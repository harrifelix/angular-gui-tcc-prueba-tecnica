import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';


const baseUrl = 'http://localhost:8444';

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${baseUrl}/api/listar`);
  }

  get(id: any): Observable<Clientes> {
    return this.http.get<Clientes>(`${baseUrl}/api/buscarByDoc/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/guardar`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/api/actualizar/${id}`, data);
  }

  eliminar(Doc: any): Observable<Clientes[]> {  
    return this.http.delete<Clientes[]>(`${baseUrl}/api/eliminar/${Doc}`);
  }

  findByNumeroDoc(Doc: any): Observable<Clientes[]> {   
    return this.http.get<Clientes[]>(`${baseUrl}/api/buscarByDoc/${Doc}`);
  }

  findByViewEdit(Doc: any): Observable<Clientes[]> {   
    return this.http.get<Clientes[]>(`${baseUrl}/api/buscarByDocView/${Doc}`);
  }
}