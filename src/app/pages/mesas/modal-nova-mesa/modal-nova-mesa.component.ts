import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesasService } from '../mesas.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-modal-nova-mesa',
    templateUrl: './modal-nova-mesa.component.html',
    styleUrls: ['./modal-nova-mesa.component.scss'],
})
export class ModalNovaMesaComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        places: [0, Validators.required]
    });
    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
        private tableService: MesasService,
        private helper: HelperService) { }

    ngOnInit() { }

    public save(): void {
        this.tableService.create(this.form.value).subscribe((response)=> {
            this.helper.message(`mesa ${response.name} salva com sucesso!`);
            this.modalCtrl.dismiss();
            this.tableService.tables.push(response);
          
        });
    }
}
