import { SistemaService } from './../sistema.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-impressora',
    templateUrl: './impressora.component.html',
    styleUrls: ['./impressora.component.scss'],
})
export class ImpressoraComponent implements OnInit {
    public printer_options;
    public form: FormGroup = this.fb.group({
        company_name: ['Teste', [Validators.required, Validators.minLength(2)]],
        rate_service: [null],
        copy: [null],
        font_size: [null]
    });

    constructor(
        private fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        public sistema : SistemaService) { }

    ngOnInit() {
   
    }

    set(){

        this.sistema.setPrinter()
    }

    get(){
        this.sistema.getPrinter()
    }

}
