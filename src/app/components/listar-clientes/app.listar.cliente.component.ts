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
  email = '';
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

  busquedaAvanzada():void{
     this.element=true;
  }

  setActiveClientes(cliente: Clientes, index: number): void {
    this.currentDatoCliente = cliente;
    this.currentIndex = index;
  }

  editClientes(clientes: Clientes, index: number):void{
 
  }

  Editar(cliente:Clientes): void {
    this.router.navigate(['/DetalleClientes/'+cliente.shared_key]);
  }

  buscarClientes(): void {
    this.currentDatoCliente = {};
    this.currentIndex = -1;
    
    this.clienteService.findByTitle(this.email)
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

  exportarCSV():void{
  }

}
