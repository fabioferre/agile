import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { BairrosService } from '../bairros.service';

@Component({
    selector: 'app-novo-bairros',
    templateUrl: './novo-bairros.component.html',
    styleUrls: ['./novo-bairros.component.scss'],
})
export class NovoBairrosComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        freight: [0, Validators.required],
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
        console.log(this.nbService.bairros)
    }

    save() {
        this.nbService.create(this.form.value).subscribe(response => {
            if(response){
                this.helper.message('Bairro cadastrado com exito');
                this.nbService.bairros.push(response);
                this.router.navigate(['/bairros']);
            }

        })
    }
}
