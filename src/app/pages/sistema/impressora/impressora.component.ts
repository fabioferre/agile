
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { ImpressoraService } from '../impressora.service';

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
        font_size: [null],
        default: [null]
    });

    constructor(
        private fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        public impressora: ImpressoraService

    ) { }

    ngOnInit() {
        this.get();
        this.getOptions();
    }

    setOptions() {
        this.impressora.printer_options = this.form.value;
        this.impressora.setOptions();
        this.helper.message("Alteração efetuada !")
    }

    get() {
        this.impressora.get().subscribe(printers => {
            this.impressora.printers = printers;
        });
    }


    getOptions() {
        this.impressora.getOptions().then(res => {
            this.printer_options = res;
            this.form.controls.company_name.setValue(res.company_name);
            this.form.controls.copy.setValue(res.copy);
            this.form.controls.default.setValue(res.default);
            this.form.controls.rate_service.setValue(res.rate_service);
            this.form.controls.font_size.setValue(res.font_size);
        })
    }

    printer() {
        this.impressora.create({
            "order": "1515",
            "total": 1414.26,
            "type": 3,
            "freight": null,
            "printer_options": this.printer_options,
            "products": [
                { "name": "suco de uva", "qtd": 5, "price": 1.25 },
                { "name": "suco", "qtd": 7, "price": 5.25 },
                { "name": "tapioca", "qtd": 3, "price": 8.25 },
                { "name": "cuz cuz", "qtd": 2, "price": 7.25 }

            ],
            "client": {
                "name": "joão",
                "address_street": "rua dez",
                "address_number": "10",
                "cell_phone": "10 1515151515"
            },
            "table": {
                "name": "4 "
            }
        }).subscribe(res => {
            console.log(res)
        });
    }

}
