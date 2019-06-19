import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';

@Component({
    selector: 'app-editar-cliente',
    templateUrl: './editar-cliente.component.html',
    styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent implements OnInit {
    private cliente = this.clientesService.clientToEdit;
    public form: FormGroup = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(2)]],
        cellphone: [''],
        phone: [''],
        address_street: [''],
        address_zipcode: [''],
        address_city: [''],
        address_state: [''],
        address_complement: [''],
        reference_point: [''],
        address_neighborhood: [''],
        address_number: [''],
        category: ['']
    });

    constructor(private fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        public clientesService: ClientesService) { }

    ngOnInit() {
        if (!this.cliente) {
            this.router.navigate(['/clientes']);
        } else {
            this.form.patchValue(this.cliente);
        }

    }

    public submit(): void {
        if (this.form.valid) {
            this.clientesService.updateById(this.form.value.id, this.form.value)
                .subscribe((client) => {
                    console.log(this.form.value)
                    const idx = this.clientesService.clientes.indexOf(this.cliente);
                    this.clientesService.clientes[idx] = client;
                    this.helper.message('Edição efetuada ')
                    this.router.navigate(['/clientes']);

                }, error => this.helper.message(error));
        }

    }

}
