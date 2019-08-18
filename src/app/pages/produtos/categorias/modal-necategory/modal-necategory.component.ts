import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../categorias.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-modal-necategory',
    templateUrl: './modal-necategory.component.html',
    styleUrls: ['./modal-necategory.component.scss'],
})
export class ModalNecategoryComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        complement_name: ['']
    });

    public complements: any = [];

    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
       
    }

}
