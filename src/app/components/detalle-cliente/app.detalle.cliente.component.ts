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
    id:'',
    numero_identificacion:'',
    genero:'',
    nombre:'',
    tipo_identificacion:''
  };
  
  message = '';
  ids='';
  TipoDoc = '';
  generos="";
  

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.ids=this.route.snapshot.params["id"];
        this.currentCliente.nombre=this.route.snapshot.params["nombre"];
        this.currentCliente.genero=this.route.snapshot.params["genero"];
        this.currentCliente.numero_identificacion=this.route.snapshot.params["doc"];
        this.currentCliente.tipo_identificacion=this.route.snapshot.params["tipodoc"];
    }

    
  onSelectedGenero(value:string): void {
		this.generos = value;
	}
	
  onSelectedTipoDoc(value:string): void {
		this.TipoDoc = value;
	}

  back(){
    this.router.navigate(['/ListarClientes/']);
  }

  actualizarClientes(): void {
    this.message = '';
    this.currentCliente.tipo_identificacion=this.TipoDoc;
    this.currentCliente.genero=this.generos;
    this.clienteService.update(this.ids, this.currentCliente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'este cliente fue actualizado exitosamente.!';
        },
        error: (e) => console.error(e)
      });
      alert('Se actualizo correctamente');
      this.router.navigate(['/ListarClientes/']);
      
  }
}