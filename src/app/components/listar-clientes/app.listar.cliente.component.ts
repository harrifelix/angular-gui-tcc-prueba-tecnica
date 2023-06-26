import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/api';
import { Clientes } from '../../models/clientes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './app.listar.cliente.component.html'
})
export class ListarClientesComponent implements OnInit {

  clientes?: Clientes[];
  currentDatoCliente: Clientes = {};
  currentIndex = -1;
  numero_documento = '';
  element=false;

  constructor(private clienteService: ClienteService,private router: Router) { }

  ngOnInit(): void {
    this.retrieveClientes();
  }

  retrieveClientes(): void {
    this.clienteService.getAll()
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveClientes();
    this.currentDatoCliente = {};
    this.currentIndex = -1;
  }


  setActiveClientes(cliente: Clientes, index: number): void {
    this.currentDatoCliente = cliente;
    this.currentIndex = index;
  }

  LimpiarCampoBusqueda(){
        this.numero_documento='';
        this.refreshList();
  }

  Editar(cliente:Clientes): void {
    this.router.navigate(['/DetalleClientes/'+cliente.id+'/'+cliente.genero+'/'+cliente.tipo_identificacion+'/'+cliente.nombre+'/'+cliente.numero_identificacion]);
  }

  Eliminar(cliente:Clientes): void {

    this.clienteService.eliminar(cliente.id)
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });    
  }

  buscarClientes(): void {
    this.currentDatoCliente = {};
    this.currentIndex = -1;
   
    if(this.numero_documento==""){this.refreshList();}
    
    this.clienteService.findByNumeroDoc(this.numero_documento)
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  insertarClientes():void{
    this.router.navigate(['/IngresarClientes']);
  }
}
