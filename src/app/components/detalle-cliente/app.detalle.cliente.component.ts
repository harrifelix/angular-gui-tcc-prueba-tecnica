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
  id='';
  TipoDoc = '';
  genero="";


  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.id=this.route.snapshot.params["id"];
    }

    
  onSelectedGenero(value:string): void {
		this.genero = value;
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
    this.currentCliente.genero=this.genero;
    this.clienteService.update(this.id, this.currentCliente)
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