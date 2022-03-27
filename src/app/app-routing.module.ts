import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { VentaComponent } from './components/venta/venta.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ClienteComponent } from './components/cliente/cliente.component';

const routes: Routes =[
  {path: '', redirectTo: '/venta', pathMatch:'full'},
  {path: 'venta',component: VentaComponent},
  {path: 'producto',component: ProductoComponent},
  {path: 'cliente',component: ClienteComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
