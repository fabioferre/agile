import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { HomeService } from 'src/app/pages/home/home.service';
import { BairrosService } from 'src/app/pages/bairros/bairros.service';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-modal-registra-cliente',
    templateUrl: './modal-registra-cliente.component.html',
    styleUrls: ['./modal-registra-cliente.component.scss'],
})
export class ModalRegistraClienteComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        cell_phone: ['', Validators.required],
        landline: [''],
        address_street: [''],
        address_number: [''],
        address_zipcode: [''],
        address_complement: [''],
        reference_point: [''],
        neighborhood_id: [''],
        category: ['']
    });

    constructor(
        private fb: FormBuilder,
        private clientService: ClientesService,
        public homeService: HomeService,
        public bairroService: BairrosService,
        private modalCtrl: ModalController) { }

    ngOnInit() {
        if (!this.bairroService.bairros) {
            this.bairroService.get().subscribe((bairros) => {
                this.bairroService.bairros = bairros;
            });
        }
    }

    public saveClient(): void {
        this.clientService.create(this.form.value).subscribe(client => {
            this.homeService.selectClient(this.form.value);
            this.modalCtrl.dismiss();
        })
    }
}
