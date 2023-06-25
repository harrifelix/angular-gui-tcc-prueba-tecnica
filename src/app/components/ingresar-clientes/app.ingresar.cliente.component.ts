import { Component } from '@angular/core';
import { ClienteService } from '../../services/api';
import { Clientes } from '../../models/clientes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-clientes',
  templateUrl: './app.ingresar.cliente.component.html'
})
export class IngresarClientesComponent {
 
  cliente: Clientes = {
    numero_identificacion:'',
    genero:'',
    nombre:'',
    tipo_identificacion:''
  };
  
  submitted = false;
  message="";
  TipoDocumento = '';
  genero="";

  constructor(private clienteService: ClienteService, private router: Router) { }

  saveCliente(): void {
    const data = {
      nombre: this.cliente.nombre,
      tipo_identificacion: this.TipoDocumento,
      numero_identificacion:this.cliente.numero_identificacion,
      genero:this.genero
    
    };

    if(!this.validarCampos(data)){return; }
  
    this.clienteService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'este cliente fue insertado exitosamente.!';
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      alert('Se guardo correctamente');
      this.router.navigate(['/ListarClientes/']);
  }

	
  onSelectedGenero(value:string): void {
		this.genero = value;
	}
	
  onSelectedTipoDoc(value:string): void {
		this.TipoDocumento = value;
	}

  validarCampos(cliente:any):Boolean{
    if(cliente.nombre===''){
     alert('el campo telefono se encuentra vacio valide..');
     return false;
    }
    else if(cliente.genero===''){
      alert('el campo name  se encuentra vacio valide..');
      return false;
    }
    else if(cliente.tipo_documento===''){
      alert('el campo name  se encuentra vacio valide..');
      return false;
    }
    else if(cliente.numero_documento===''){
      alert('el campo fecha inicio  se encuentra vacio valide..');
      return false;
    }
    
    return true;
}


  newCliente(): void {
    this.submitted = false;
    this.cliente = {
      nombre: '',
      numero_identificacion:'',
      tipo_identificacion: '',
      genero: ''
    };
  }
}
