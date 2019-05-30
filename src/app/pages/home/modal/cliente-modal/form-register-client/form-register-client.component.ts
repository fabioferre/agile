import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { HomeService } from '../../../home.service';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-form-register-client',
    templateUrl: './form-register-client.component.html',
    styleUrls: ['./form-register-client.component.scss'],
})
export class FormRegisterClientComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        cellphone: ['', Validators.required],
        phone: [''],
        address_street: [''],
        address_number: [''],
        address_zipcode: [''],
        address_complement: [''],
        reference_point: [''],
        address_neighborhood: [''],
        category: ['']
    });
    
    constructor(
        private fb: FormBuilder, 
        private clientService: ClientesService,
        public homeService: HomeService,
        private modalCtrl: ModalController) { }

    ngOnInit() {

    }

    public saveClient(): void {
        this.clientService.create(this.form.value).subscribe(client => {
            this.homeService.selectClient(client);
            this.modalCtrl.dismiss();
        })
    }
}
