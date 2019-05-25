import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { BairrosService } from '../../bairros/bairros.service';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent implements OnInit {
  private cliente = this.clientesService.clientToEdit;
  public form: FormGroup = this.fb.group({
    id: [this.cliente.id],
    name: [this.cliente.name, [Validators.required, Validators.minLength(2)]],
    cell_phone: [this.cliente.cell_phone],
    landline: [this.cliente.landline],
    address_street: [this.cliente.address_street],
    address_zipcode: [this.cliente.address_zipcode],
    address_city: [this.cliente.address_city],
    address_state: [this.cliente.address_state],
    address_complement: [this.cliente.address_complement],
    reference_point: [this.cliente.reference_point],
    neighborhood_id: [this.cliente.neighborhood_id],
    address_number: [this.cliente.address_number],
    category: [this.cliente.category]
  });

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public bairroService: BairrosService,
    public clientesService: ClientesService) { }

  ngOnInit() {
    if (!this.bairroService.bairros) {
      this.bairroService.get().subscribe((bairros) => {
        this.bairroService.bairros = bairros;
      });
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.clientesService.updateById(this.form.value.id, this.form.value)
        .subscribe((client) => {
          if(client){
            const idx = this.clientesService.clientes.indexOf(this.cliente);
            this.clientesService.clientes[idx] = client;
            this.helper.message('Edição efetuada ')
            this.router.navigate(['/clientes']);
          }
        });
    }

  }

}
