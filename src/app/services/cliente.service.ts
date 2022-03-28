import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private Url = "https://localhost:44316/"
  private Api = "api/cliente/"
  constructor(private http: HttpClient) { }

  getListaClientes(): Observable<any>{
    return this.http.get(this.Url+this.Api);
  }

  eliminarCliente(idCliente: number): Observable<any>{
    return this.http.delete(this.Url + this.Api + idCliente)
  }

  agregarCliente(cliente: any): Observable<any>{
    return this.http.post(this.Url + this.Api, cliente);
  }

  editarCliente(idCliente: number, cliente: any): Observable<any>{
    return this.http.put(this.Url + this.Api + idCliente, cliente)
  }
}