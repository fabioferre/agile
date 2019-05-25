import { Component, OnInit } from '@angular/core';
import { BairrosService } from '../bairros.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-editar-bairros',
    templateUrl: './editar-bairros.component.html',
    styleUrls: ['./editar-bairros.component.scss'],
})
export class EditarBairrosComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        freight: [''],
        city: [''],
        state: [''],
        country: ['Brasil'],
        region: ['']
    });

    constructor(
        private fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        private nbService: BairrosService
    ) { }

    ngOnInit() {
        if (this.nbService.bairroToEdit) {
            this.form.patchValue(this.nbService.bairroToEdit);
        } else {
            this.router.navigate(['bairros']);
        }
    }

    public save(): void {
        this.nbService.updateById(this.nbService.bairroToEdit.id, this.form.value)
            .subscribe(response => {
                if (response) {
                    let idx = this.nbService.bairros.indexOf(this.nbService.bairroToEdit);
                    this.nbService.bairros[idx] = this.form.value;
                    this.router.navigate(['/bairros']);

                }

            })
    }

}
