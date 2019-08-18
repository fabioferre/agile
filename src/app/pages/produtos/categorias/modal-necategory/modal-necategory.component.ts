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
        complement: this.fb.group({
            name: ['', Validators.required],
            price: [0, Validators.required]
        })
    });

    public complements: any = [];
    public update: boolean;
    public loading: boolean;
    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
        private categoryService: CategoriasService
    ) { }

    ngOnInit() {
        if (this.categoryService.elementToedit) {
            this.form.patchValue(this.categoryService.elementToedit);
            this.complements = this.categoryService.elementToedit.complements;
            this.update = true;
        }
    }

    get complementForm(): any {
        return this.form.controls.complement;
    }
    addComplement() {
        this.loading = true;
        // console.log( this.complementForm.value);
        this.categoryService.storeComplement(this.categoryService.elementToedit.id, this.complementForm.value).subscribe((response) => {
            console.log(response);
            this.complements.push(response);
            this.complementForm.reset();
            this.loading = false;
        });
    }

    removeComplement(complement) {
        this.loading = true;
        // console.log( this.complementForm.value);
        // console.log('das')
        this.categoryService.deleteComplement(this.categoryService.elementToedit.id, complement.id).subscribe((response) => {
            const idx = this.complements.indexOf(complement);
            this.complements.splice(idx, 1);
            this.loading = false;
        });
    }
    save() {
        if (this.update) {
            this.categoryService.updateById(this.categoryService.elementToedit.id, this.form).subscribe((response) => {
                console.log(response, 'update');
            });
        } else {
            this.categoryService.create(this.form).subscribe((response) => {
                console.log(response);
            });
        }
    }
}
