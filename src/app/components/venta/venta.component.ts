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
  TableHead: any[] = ["Cliente", "Producto", "Cantidad"]
  listaVentas: any[] = [];
  listaProductos: any[] = [];
  listaClientes: any[] = [];
  idPventa_: number = 0;
  idPproducto: number = 0;
  listaProductosNombre: any[] = [];
  typeEdit: boolean = false;
  formVenta: FormGroup;
  id: number | undefined;
  constructor(private formB: FormBuilder, private toastr: ToastrService, private ventasService: VentaService, private clienteService: ClienteService, private productoService: ProductoService) {
    this.formVenta = this.formB.group({
      idCliente: [''],
      idProducto: [''],
      cantidad: [''],
      total: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerPrecios();
  }

  obtenerPrecios() {
    this.productoService.getListProducts().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index].precioUnitario;
        console.log(element);
      }
    })
  }
  obtenerProductos() {
    this.productoService.getListProducts().subscribe(data => {
      this.listaProductos = data;
      console.log(data);
      this.listaProductos.forEach((element, index) => {
        if (data[index].idProducto === 5) {
          console.log("El producto" + element.nombre);

        }
      });
    })
  }

  obtenerVentas() {
    this.clienteService.getListaClientes().subscribe(data => {
      this.listaClientes = data;
      console.log(data);
    })
    this.ventasService.getListaVentas().subscribe(data1 => {
      this.listaVentas = data1;
      this.productoService.getListProducts().subscribe(data2 => {
        this.listaProductos = data2;
        console.log(this.listaVentas);
        console.log(this.listaProductos);
        this.listaVentas.forEach((element1, index2) => {
          this.listaProductos.forEach((element2, index) => {
            console.log(element1, element2);
            if (element1.idProducto == element2.idProducto) {
              console.log("Entro al if", element2.nombre);
              this.listaVentas[index2].idProducto = element2.nombre
            } else {
              console.log("No entro al if");
            }
          });
        });
        this.obtenerProductos();
      })
    })
  }

  agregarProducto() {
    const venta: any = {
      idCliente: this.formVenta.get('idCliente')?.value,
      IdProducto: this.formVenta.get('idProducto')?.value,
      cantidad: this.formVenta.get('cantidad')?.value,
      total: this.formVenta.get('cantidad')?.value * 2
    }
    if (this.id == undefined) {
      console.log(venta);
      this.ventasService.agregarVenta(venta).subscribe(data => {
        this.toastr.success('Tu producto se ha creado correctamente', 'Producto ingresado');
        this.obtenerVentas();
        this.formVenta.reset()
      })
    } else {
      venta.idVenta = this.id
      this.ventasService.editarVenta(this.id, venta).subscribe(data => {
        this.formVenta.reset()
        this.id = undefined
        this.toastr.success('Tu producto se ha actualizado correctamente', 'Producto Actualizado');
        this.obtenerVentas()
      })
    }
  }

  eliminarVenta(idVenta: number) {
    this.ventasService.eliminarVentas(idVenta).subscribe(data => {
      this.toastr.error('Tu producto se ha eliminado', 'Producto eliminado');
      this.obtenerVentas();
    })
  }
  selectEdit() {
    this.typeEdit = true
  }

  editarVenta(venta: any) {
    this.typeEdit = true
    this.id = venta.idVenta;
    this.formVenta.patchValue({
      idCliente: venta.idCliente,
      idProducto: venta.idProducto,
      cantidad: venta.cantidad,
      total: this.formVenta.get('cantidad')?.value * 2
    })

  }

}