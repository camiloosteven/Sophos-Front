import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  TableHead: any[] = ["Cliente", "Producto", "Cantidad", "Total"]
  listaVentas: any[] = [];
  listaProductos: any[] = [];
  listaClientes: any[] = [];
  idPventa_: number = 0;
  valorTotal: number = 0;
  listaProductosNombre: any[] = [];
  typeEdit: boolean = false;
  stock: boolean = true;
  formVenta: FormGroup;
  id: number | undefined;
  constructor(private formB: FormBuilder, private toastr: ToastrService, private ventasService: VentaService, private clienteService: ClienteService, private productoService: ProductoService) {
    this.formVenta = this.formB.group({
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required],
      total: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getListaClientes().subscribe(data => {
      this.listaClientes = data;
    })
  }
  obtenerProductos() {
    this.productoService.getListProducts().subscribe(data => {
      this.listaProductos = data;
    })
  }

  obtenerVentas() {
    this.clienteService.getListaClientes().subscribe(data => {
      this.listaClientes = data;
    })
    this.ventasService.getListaVentas().subscribe(data1 => {
      this.listaVentas = data1;
      this.productoService.getListProducts().subscribe(data2 => {
        this.listaProductos = data2;
        this.listaVentas.forEach((element1, index2) => {
          this.listaProductos.forEach((element2, index) => {
            if (element1.idProducto == element2.idProducto) {
              this.listaVentas[index2].idProducto = element2.nombre
            }
          });
        });
        this.listaVentas.forEach((element1, index2) => {
          this.listaClientes.forEach((element2, index) => {
            if (element1.idCliente == element2.idCliente) {
              this.listaVentas[index2].idCliente = element2.nombres
            }
          });
        });
        this.obtenerProductos();
      })
    })
  }

  agregarVenta() {
    this.productoService.getListProducts().subscribe(data2 => {
      this.listaProductos = data2;
    })
    this.listaProductos.forEach(element => {
      if (this.formVenta.get('idProducto')?.value == element.idProducto) {
        this.valorTotal = this.formVenta.get('cantidad')?.value * element.precioUnitario
        if (this.formVenta.get('cantidad')?.value > element.cantidad) {
          this.stock = false
          this.toastr.error('No hay suficientes productos', 'Stock Insuficionte');
        }
      }
      
    })
    const venta: any = {
      idCliente: this.formVenta.get('idCliente')?.value,
      IdProducto: this.formVenta.get('idProducto')?.value,
      cantidad: this.formVenta.get('cantidad')?.value,
      total: this.valorTotal
    }
    console.log(venta);
    
    if (this.id == undefined) {
      if (this.stock) {
        this.ventasService.agregarVenta(venta).subscribe(data => {
          this.toastr.success('La venta se ha registrado correctamente', 'Venta registrada');
          this.listaProductos.forEach(element => {
            if (this.formVenta.get('idProducto')?.value == element.idProducto) {
              const producto: any ={
                        idProducto: element.idProducto,
                        nombre: element.nombre,
                        precioUnitario: element.precioUnitario,
                        cantidad: element.cantidad-this.formVenta.get('cantidad')?.value
                      }
                      console.log(producto);
                      this.productoService.editProduct(element.idProducto,producto).subscribe(data =>{})
                      this.obtenerVentas();
                      this.formVenta.reset()
            }})
          this.obtenerVentas();
          this.formVenta.reset()
        })
      }
    }
    // this.listaProductos.forEach(element => {
    //   if (this.formVenta.get('idProducto')?.value == element.idProducto) {
    //     if (this.formVenta.get('cantidad')?.value > element.cantidad) {
    //       this.stock = false
    //       this.toastr.error('No hay suficientes productos', 'Stock Insuficionte');
    //     } else {
    //       this.stock = true
    //       const producto: any ={
    //         idProducto: element.idProducto,
    //         nombre: element.nombre,
    //         precioUnitario: element.precioUnitario,
    //         cantidad: element.cantidad-this.formVenta.get('cantidad')?.value
    //       }
    //       console.log(producto);
    //       this.productoService.editProduct(element.idProducto,producto).subscribe(data =>{})
    //       this.obtenerVentas();
    //       this.formVenta.reset()
    //     }
    //   }
      
    // });
    console.log(this.formVenta.get('idCliente')?.value);
  }
}