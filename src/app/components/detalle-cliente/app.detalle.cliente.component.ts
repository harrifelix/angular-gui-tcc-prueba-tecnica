import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/api';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './app.detalle.cliente.component.html'
})

export class DetalleClienteComponent implements OnInit {

  @Input() viewMode = true;
  
  
  @Input() currentCliente: Clientes = {
    shared_key:'',
    business_id: '',
    phone:'',
    email: '',
    date_add: '',
    start_date:'',
    end_date:''
  };
  
  message = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.getClientes(this.route.snapshot.params["shared_key"]);
    }

  getClientes(id: string): void {
    this.clienteService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCliente = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  actualizarClientes(): void {
    this.message = '';
    this.clienteService.update(this.currentCliente.shared_key, this.currentCliente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
}