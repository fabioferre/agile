import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../categorias.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-modal-necategory',
    templateUrl: './modal-necategory.component.html',
    styleUrls: ['./modal-necategory.component.scss'],
})
export class ModalNecategoryComponent implements OnInit {
    public loading;
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
    });
    public complementForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        price: [0, Validators.required]
    });

    public complements: any = [];
    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
        private categoryService: CategoriasService,
        public helper: HelperService
    ) { }

    ngOnInit() {
        if (this.categoryService.elementToedit) {
            this.form.patchValue(this.categoryService.elementToedit);
            this.complements = this.categoryService.elementToedit.complements;
        }

    }

    addComplement() {
        this.loading = true;
        this.categoryService.storeComplement(this.categoryService.elementToedit.id, this.complementForm.value).subscribe((response) => {
            this.loading = false;
            this.complements.unshift(response);
            this.complementForm.reset();
            this.helper.toast('Adicionado com sucesso');
            
        });
    }

    removeComplement(complement) {
        this.loading = true;
        this.categoryService.deleteComplement(this.categoryService.elementToedit.id, complement.id).subscribe((response) => {
            this.loading = false;
            const idx = this.complements.indexOf(complement);
            this.complements.splice(idx, 1);
        });
    }
    save() {
       
        this.categoryService.updateById(this.categoryService.elementToedit.id, this.form.value).subscribe((response) => {
            const idx = this.categoryService.categories.indexOf(this.categoryService.elementToedit);
            this.categoryService.categories[idx] = response;
            this.helper.toast('Atualizado com sucesso');
            this.modalCtrl.dismiss();
        });
    }

}
