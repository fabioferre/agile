import { Component, OnInit, Input } from '@angular/core';
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
        cellphone: [''],
        phone: [''],
        address_street: [''],
        address_number: [''],
        address_zipcode: [''],
        address_complement: [''],
        reference_point: [''],
        address_neighborhood: [''],
        category: ['']
    });

    @Input() public client: any;
    constructor(
        private fb: FormBuilder, 
        private clientService: ClientesService,
        public homeService: HomeService,
        private modalCtrl: ModalController
    ) { }

    get isEdit() {
        return this.client? true: false;
    }
    ngOnInit() {
        if(this.isEdit) {
            this.form.patchValue(this.client);
        }
    }

    public saveClient(): void {
        if(this.isEdit) {
            this.clientService.updateById(this.client.id, this.form.value).subscribe(client => {
                this.homeService.selectClient(client);
                this.modalCtrl.dismiss();
            });
        } else {
            this.clientService.create(this.form.value).subscribe(client => {
                this.homeService.selectClient(client);
                this.modalCtrl.dismiss();
            });
        }
        
    }
}
