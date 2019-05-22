import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { HomeService } from '../../../home.service';
import { BairrosService } from 'src/app/pages/bairros/bairros.service';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-form-register-client',
    templateUrl: './form-register-client.component.html',
    styleUrls: ['./form-register-client.component.scss'],
})
export class FormRegisterClientComponent implements OnInit {
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
        if(!this.bairroService.bairros){
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
