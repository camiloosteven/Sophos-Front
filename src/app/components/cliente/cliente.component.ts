import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  TableHead: any[] = ["ID", "Nombre",  "Telefono"]
  public listaClientes: any[] = [];
  typeEdit: boolean = false;
  formCliente: FormGroup;
  id: number | undefined;
  constructor(private formB: FormBuilder,private toastr: ToastrService, private clienteService: ClienteService) {
    this.formCliente = this.formB.group({
      nombre: ['',Validators.required],
      precioUnitario: ['',Validators.required],
      cantidad: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.obtenerCliente();
  }
  obtenerCliente(){
    this.clienteService.getListaClientes().subscribe(data=>{
      this.listaClientes = data;
      console.log(data);
    })
  }
  agregarProducto(){
    const cliente: any ={
      nombres: this.formCliente.get('nombre')?.value,
      apellidos: this.formCliente.get('precioUnitario')?.value,
      telefono: this.formCliente.get('cantidad')?.value,
      edad: this.formCliente.get('edad')?.value,
      corrreo: this.formCliente.get('correo')?.value,
    }
    if (this.id == undefined) {
        this.clienteService.agregarCliente(cliente).subscribe(data =>{
        this.toastr.success('Tu producto se ha creado correctamente', 'Producto ingresado');
        this.obtenerCliente();
        this.formCliente.reset()    
      })    
    }else{
        cliente.idCliente = this.id
        this.clienteService.editarCliente(this.id,cliente).subscribe(data =>{
        this.formCliente.reset()
        this.id = undefined
        this.toastr.success('Tu producto se ha actualizado correctamente', 'Producto Actualizado');
        this.obtenerCliente()
      })
    }
  }
  
  eliminarPorducto(idCliente: number){
    this.clienteService.eliminarCliente(idCliente).subscribe(data =>{
    this.toastr.error('Tu producto se ha eliminado', 'Producto eliminado');
    this.obtenerCliente();
    })
  }
  selectEdit(){
    this.typeEdit = true
  }

  editarProducto(cliente: any){
    this.typeEdit = true
    this.id = cliente.idCliente;
    this.formCliente.patchValue({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      telefono: cliente.telefono,
      edad: cliente.edad,
      correo: cliente.correo
    })

  }

}

