import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private Url = "https://localhost:44334/"
  private Api = "api/venta/"

  constructor(private http: HttpClient) { }

  getListaVentas(): Observable<any>{
    return this.http.get(this.Url+this.Api);
  }

  eliminarVentas(idVenta: number): Observable<any>{
    return this.http.delete(this.Url + this.Api + idVenta)
  }

  agregarVenta(venta: any): Observable<any>{
    return this.http.post(this.Url + this.Api, venta);
  }

  editarVenta(idVenta: number, venta: any): Observable<any>{
    return this.http.put(this.Url + this.Api + idVenta, venta)
  }
}