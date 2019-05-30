import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss'],
})
export class NovoClienteComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cell_phone: [''],
    phone: [''],
    address_street: [''],
    address_zipcode: [''],
    address_city: [''],
    address_state: [''],
    address_complement: [1],
    reference_point: [''],
    address_neighborhood: [''],
    address_number: [null],
    category: [1]
  });

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public clientesService: ClientesService) { }

  ngOnInit() {

  }

  public submit(): void {
    if (this.form.valid) {
      this.clientesService.create(this.form.value)
        .subscribe((client) => {
          if(client){
            this.helper.message('cliente cadastrado !')
            this.clientesService.clientes.push(client)
            this.router.navigate(['/clientes']);

          }

        });
    }
  }
}
