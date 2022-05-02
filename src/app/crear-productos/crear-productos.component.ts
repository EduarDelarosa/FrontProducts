import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProducto } from '../models/Producto';
import { ApiproductosService } from '../services/apiproductos.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {

  form!: FormGroup;
  subscripcion!: Subscription;
  producto!: IProducto;
  idProducto?: number = 0;

  constructor(private fb: FormBuilder,
              private apiProductos: ApiproductosService,
              private toastr: ToastrService) {
    this.form = fb.group({
      id: 0,
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],
      cantidad:['',Validators.required],
      categoria:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.subscripcion = this.apiProductos.obtenerProduct().subscribe((data:any) => {
      this.producto = data;
      this.form.patchValue({
        descripcion : this.producto.descripcion,
        precio : this.producto.precio,
        cantidad : this.producto.cantidad,
        categoria : this.producto.cateogoriaId
      });
      this.idProducto = this.producto.id;
    })
  }

  addProducto(){
    if(this.idProducto === undefined){
      this.add();
      location.reload();
    }else{
      this.edit();
      location.reload();
    }
  }

  add(){
    const producto : IProducto = {
      descripcion : this.form.get('descripcion')?.value,
      precio : this.form.get('precio')?.value,
      cantidad : this.form.get('cantidad')?.value,
      cateogoriaId : this.form.get('categoria')?.value
    }
    this.apiProductos.add(producto).subscribe(data => {
      this.toastr.success('Producto Agregado', 'El producto fue agregado con éxito!');
      this.apiProductos.getProductos();
      this.form.reset();
    })
  }

  edit(){
    const producto : IProducto = {
      id: this.producto.id,
      descripcion : this.form.get('descripcion')?.value,
      precio : this.form.get('precio')?.value,
      cantidad : this.form.get('cantidad')?.value,
      cateogoriaId : this.form.get('categoria')?.value
    }
    this.apiProductos.edit(this.idProducto, producto).subscribe(data => {
      this.toastr.info('Producto Actualizado', 'El producto fue actualizado con éxito!');
      this.apiProductos.getProductos();
      this.form.reset();
      this.idProducto = 0;
    })
  }

}
