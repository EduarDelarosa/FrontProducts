import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ApiproductosService {

  url: string = 'https://localhost:44336/api/Producto';
  lista!: IProducto[];
  private actualizarForm = new BehaviorSubject<IProducto>({} as any);


  constructor(private _http: HttpClient) { }

  getProductos(){
    return this._http.get(this.url);
  }

  add(producto: IProducto): Observable<IProducto>{
    return this._http.post<IProducto>(this.url, producto);
  }

  edit(id: any, producto: IProducto): Observable<IProducto>{
    return this._http.put<IProducto>(`${this.url}/${id}`, producto);
  }

  delete(id: number): Observable<IProducto>{
    return this._http.delete<IProducto>(`${this.url}/${id}`);
  }

  obtenerProduct(): Observable<IProducto>{
    return this.actualizarForm.asObservable();
  }

  actualizar(producto: IProducto){
    this.actualizarForm.next(producto);
  }
}
