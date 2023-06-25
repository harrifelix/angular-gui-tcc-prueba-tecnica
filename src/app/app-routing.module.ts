import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent  } from './components/listar-clientes/app.listar.cliente.component';
import { IngresarClientesComponent } from './components/ingresar-clientes/app.ingresar.cliente.component';
import { DetalleClienteComponent } from './components/detalle-cliente/app.detalle.cliente.component';



const routes: Routes = [
  { path: '', redirectTo: 'Cliente', pathMatch: 'full' },
  { path: 'ListarClientes', component: ListarClientesComponent },
  { path: 'IngresarClientes', component: IngresarClientesComponent },
  { path: 'DetalleClientes/:id', component: DetalleClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }