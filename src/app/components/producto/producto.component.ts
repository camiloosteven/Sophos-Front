import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  TableHead: any[] = ["Producto", "Cantidad",  "Precio c/u"]
  listProducts: any[] = [];
  typeEdit: boolean = false;
  form: FormGroup;
  id: number | undefined;
  constructor(private formB: FormBuilder,private toastr: ToastrService, private productService: ProductoService) {
    this.form = this.formB.group({
      nombre: ['',Validators.required],
      precioUnitario: ['',Validators.required],
      cantidad: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos(){
    this.productService.getListProducts().subscribe(data=>{
      this.listProducts = data;
      console.log(data);
    })
  }
  agregarProducto(){
    const producto: any ={
      nombre: this.form.get('nombre')?.value,
      precioUnitario: this.form.get('precioUnitario')?.value,
      cantidad: this.form.get('cantidad')?.value,
    }
    if (this.id == undefined) {
        this.productService.addProduct(producto).subscribe(data =>{
        this.toastr.success('Tu producto se ha creado correctamente', 'Producto ingresado');
        this.obtenerProductos();
        this.form.reset()    
      })    
    }else{
        producto.idProducto = this.id
        this.productService.editProduct(this.id,producto).subscribe(data =>{
        this.form.reset()
        this.id = undefined
        this.toastr.success('Tu producto se ha actualizado correctamente', 'Producto Actualizado');
        this.obtenerProductos()
        this.typeEdit = false
      })
    }
  }
  
  eliminarPorducto(idProducto: number){
    this.productService.deleteProduct(idProducto).subscribe(data =>{
    this.toastr.error('Tu producto se ha eliminado', 'Producto eliminado');
    this.obtenerProductos();
    })
  }
  selectEdit(){
    this.typeEdit = true
  }

  editarProducto(producto: any){
    this.typeEdit = true
    this.id = producto.idProducto;
    this.form.patchValue({
      nombre: producto.nombre,
      precioUnitario: producto.precioUnitario,
      cantidad: producto.cantidad,
    })

  }

}
