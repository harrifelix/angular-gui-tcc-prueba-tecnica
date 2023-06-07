import { Component } from '@angular/core';
import { ClienteService } from '../../services/api';
import { Clientes } from '../../models/clientes';

@Component({
  selector: 'app-ingresar-clientes',
  templateUrl: './app.ingresar.cliente.component.html'
})
export class IngresarClientesComponent {
 
  cliente: Clientes = {
    shared_key:'',
    business_id: '',
    phone:'',
    email: '',
    date_add: '',
    start_date:'',
    end_date:''
  };
  
  
  reCorto = /\S+@\S+\.\S+/;
  submitted = false;

  constructor(private clienteService: ClienteService) { }

  saveCliente(): void {
    const data = {
      shared_key:this.cliente.shared_key,
      business_id: this.cliente.business_id,
      email: this.cliente.email,
      phone:this.cliente.phone,
      start_date:this.cliente.start_date,
      end_date:this.cliente.end_date
    
    };

    if(!this.validarCampos(data)){return; }
  
    if(!this.validarCorreo(data.email)){  return; }
   
    this.clienteService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  validarCorreo(email:any):Boolean{
      if(!this.reCorto.test(email)){
          alert('Correo invalido validelo...')
          return false;
      }
      return true;
  }

  validarCampos(cliente:any):Boolean{
    if(cliente.phone===''){
     alert('el campo telefono se encuentra vacio valide..');
     return false;
    }
    else if(cliente.business_id===''){
      alert('el campo name  se encuentra vacio valide..');
      return false;
    }
    else if(cliente.email===''){
      alert('el campo name  se encuentra vacio valide..');
      return false;
    }
    else if(cliente.start_date===''){
      alert('el campo fecha inicio  se encuentra vacio valide..');
      return false;
    }
    else if(cliente.end_date===''){
      alert('el campo fecha fin  se encuentra vacio valide..');
      return false;
    }
    return true;
}

  newCliente(): void {
    this.submitted = false;
    this.cliente = {
      shared_key:'',
      business_id: '',
      phone:'',
      email: '',
      date_add: '',
      start_date:'',
      end_date:''
    };
  }
}
