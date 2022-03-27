import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private Url = "https://localhost:44316/"
  private Api = "api/product/"
  constructor(private http: HttpClient) { }

  getListProducts(): Observable<any>{
    return this.http.get(this.Url+this.Api);
  }

  deleteProduct(idProducto: number): Observable<any>{
    return this.http.delete(this.Url + this.Api + idProducto)
  }

  addProduct(producto: any): Observable<any>{
    return this.http.post(this.Url + this.Api, producto);
  }

  editProduct(idProducto: number, producto: any): Observable<any>{
    return this.http.put(this.Url + this.Api + idProducto, producto)
  }
}
