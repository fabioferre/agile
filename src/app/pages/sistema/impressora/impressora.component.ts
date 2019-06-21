
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { ImpressoraService } from '../impressora.service';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';

@Component({
    selector: 'app-impressora',
    templateUrl: './impressora.component.html',
    styleUrls: ['./impressora.component.scss'],
})
export class ImpressoraComponent implements OnInit {
    status: boolean = false;
    usbPrintDriver: UsbDriver;
    webPrintDriver: WebPrintDriver;
    ip: string = '';
    public printer_options;
    public form: FormGroup = this.fb.group({
        company_name: ['Teste', [Validators.required, Validators.minLength(2)]],
        company_cnpj: ['Teste', [Validators.required, Validators.minLength(2)]],
        company_phone: ['Teste', [Validators.required, Validators.minLength(2)]],
        company_: ['Teste', [Validators.required, Validators.minLength(2)]],
        rate_service: [null],
        copy: [1],
        font_size: [null],
        default: [null],
        create: [null],
        update: [null],
        close: [null],
        delivery: [null],
        prepare: [null],
        client: [null],
    });

    constructor(
        private printService: PrintService,
        private fb: FormBuilder,
        private helper: HelperService,
        private router: Router,
        public impressora: ImpressoraService

    ) { 
        this.usbPrintDriver = new UsbDriver();
        this.printService.isConnected.subscribe(result => {
            this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            } else {
            console.log('Not connected to printer.');
            }
        });
    }

    ngOnInit() {
        // this.get();
        // this.getOptions();
        // console.log( this.getOptions())
        this.requestUsb();
    }

    requestUsb() {
        this.usbPrintDriver.requestUsb().subscribe(result => {
            console.log(result)
            this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
        });
    }

    connectToWebPrint() {
        this.webPrintDriver = new WebPrintDriver(this.ip);
        this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
    }

    print(driver: PrintDriver) {
        this.printService.init()
            .setBold(true)
            .writeLine('Hello World!')
            .setBold(false)
            .feed(4)
            .cut('full')
            .flush();
    }

    public toggleOption() {
        if(this.form.controls.client.value) {
            this.form.controls.collection.disable()
            this.form.controls.collection.setValue(false)
        } else {
            this.form.controls.collection.enable()
        }

        if(this.form.controls.delivery.value) {
            this.form.controls.fractioned.disable()
            this.form.controls.fractioned.setValue(false)
        } else {
            this.form.controls.fractioned.enable()
        }
    }

    save() {
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
            this.form.patchValue(res)

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
