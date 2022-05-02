import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from '../models/Producto';
import { ApiproductosService } from '../services/apiproductos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.scss']
})
export class ListProductosComponent implements OnInit {

  lista!: IProducto[];

  constructor(private apiProductos: ApiproductosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiProductos.getProductos().subscribe((data: any)=>{
      this.lista = data.result;
    })
  }

  edit(producto: any){
    this.apiProductos.actualizar(producto);
  }

  delete(id: any){
    if(confirm('¿Estas seguro que deseas eliminar este producto?')){
      this.apiProductos.delete(id).subscribe(data =>{
        this.toastr.warning('Producto Eliminado!', 'El Producto fue eliminado con éxito!');
        this.apiProductos.getProductos();
      });
    }
    location.reload();
  }

}
