import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MesasService } from '../mesas.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-modal-edita-mesa',
    templateUrl: './modal-edita-mesa.component.html',
    styleUrls: ['./modal-edita-mesa.component.scss'],
})
export class ModalEditaMesaComponent implements OnInit {
    
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        places: [1, Validators.required]
    });
    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
        private tableService: MesasService,
        private helper: HelperService
    ) { }

    ngOnInit() { 
        this.form.controls.name.setValue(this.tableService.tableToEdit.name);
        this.form.controls.places.setValue(this.tableService.tableToEdit.places);
    }

    public delete() {
        this.tableService.deleteById(this.tableService.tableToEdit.id)
            .subscribe(response => {
                let idx = this.tableService.tables.indexOf(this.tableService.tableToEdit);
                this.tableService.tables.splice(idx, 1);
                this.modalCtrl.dismiss();
            });
    }

    public update(): void {
        this.tableService.updateById(this.tableService.tableToEdit.id ,this.form.value)
        .subscribe((response) => {
            let idx = this.tableService.tables.indexOf(this.tableService.tableToEdit);
            this.tableService.tables[idx] = this.form.value;
            this.tableService.tableToEdit = null;
            this.helper.message(`mesa ${response.name} atualizada com sucesso!`);
            this.modalCtrl.dismiss();
        });
    }
}
