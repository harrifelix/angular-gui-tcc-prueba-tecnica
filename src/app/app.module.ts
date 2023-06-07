import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './components/listar-clientes/app.listar.cliente.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetalleClienteComponent } from './components/detalle-cliente/app.detalle.cliente.component';
import { IngresarClientesComponent } from './components/ingresar-clientes/app.ingresar.cliente.component';
import { ClienteService } from './services/api';

@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    DetalleClienteComponent,
    IngresarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
