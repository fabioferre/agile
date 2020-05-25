import { StockService } from './../stock.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
    selector: 'app-modal-fluxo',
    templateUrl: './modal-fluxo.component.html',
    styleUrls: ['./modal-fluxo.component.scss'],
})
export class ModalFluxoComponent implements OnInit {
    public barcodeOptions: BarcodeScannerOptions;
    public productsFiltered: any = { 'id': null, 'name': '-----', 'cost_price': 0.00, 'units': 0 };
    public form: FormGroup = this.fb.group({
        quantity: [1, Validators.required],
        product_id: [null, Validators.required],
        product: [null, Validators.required],
        current_cost_price: [0, Validators.required],
        type: [1, Validators.required],
        custom_calc: this.fb.group({
            qtd_box: [''],
            qtd_per_box: [''],
        })
    });

    filteredOptions: Observable<any[]>;

    public calcType: number = 1;
    public completed: boolean;
    constructor(
        private nativeAudio: NativeAudio,
        private barcodeScanner: BarcodeScanner,
        public modalCtrl: ModalController,
        public helper: HelperService,
        private fb: FormBuilder,
        public alertCtrl: AlertController,
        public stockService: StockService,
        public produtoService: ProdutoService,
        public dialogRef: MatDialogRef<ModalFluxoComponent>
    ) { }



    ngOnInit() {
        this.product.valueChanges.subscribe((valor) => {
            this.productsFiltered = valor
            if (!valor.id) {
                this.helper.toast('Produto não encontrado', { color: 'secondary' });
                return false;
            }
            this.form.controls.product_id.setValue(valor.id);
            this.form.controls.current_cost_price.setValue(valor.cost_price);
        });

        this.filteredOptions = this.product.valueChanges
            .pipe(
                startWith(''),
                map(value => this.search(value))
            );



        this.customForm.valueChanges.subscribe(() => {
            let qtd_box = parseFloat(this.customForm.get('qtd_box').value );
            let qtd_per_box = parseFloat(this.customForm.get('qtd_per_box').value );
            
            this.form.get('quantity').setValue(qtd_box * qtd_per_box);
        });
    }

    get customForm() {
        return this.form.get('custom_calc') as FormGroup;
    }
    get product() {
        return this.form.controls.product;
    }



    displayFn(product?) {
        return product ? product.name : undefined;
    }

    search(text: any) {
        text = text.toString().toLowerCase().trim();
        return this.produtoService.products.filter((product: any) => {
            product.code = product.code ? product.code : "";
            if (product.name.toLowerCase().includes(text) || product.code.toLowerCase().includes(text)) {
                if (product.stock) {
                    return product;
                }

            }
        });
    }

    get quantity() {
        return this.form.controls.quantity;
    }


    plus() {
        let sum = 0;
        if(!Number.isNaN(this.quantity.value) ) {
            sum = parseInt(this.quantity.value) + 1;
        }
      
        this.quantity.setValue(sum);
    }

    less() {
        let sum = 0;
        if(!Number.isNaN(this.quantity.value)) {
            sum = parseInt(this.quantity.value) - 1;
        }
        this.quantity.setValue(sum);
    }

    save() {

        if (this.quantity.value === 0) {
            this.helper.toast('Informe a quantidade', { color: 'secondary' });
            return false;
        }
        if (this.quantity.value < 0) {
            this.form.controls.type.setValue(0);
        }

        this.stockService.create(this.form.value).subscribe(data => {
            this.beep()
            // this.dialogRef.close();
            this.form.get('product').setValue('');
            this.form.get('product_id').setValue('');
            this.form.get('quantity').setValue(0);
            this.form.get('current_cost_price').setValue('');
            this.helper.toast('Registro efetuado !')
            this.stockService.flows.unshift(data);
            this.completed = true;
            setTimeout(() =>  this.completed = false, 1200);
        });

    }

    encode(textToEncode) {

        return this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textToEncode).then((data) => {
            return data;
        }, (err) => {
            return err;
        })
    }

    scanner() {
        this.barcodeOptions = {
            prompt: 'Codigo de barras do produto'
        };

        this.barcodeScanner.scan(this.barcodeOptions).then(barcodeData => {

            let dados = this.search(barcodeData.text)[0]
            if (dados) {
                this.product.setValue(dados);
            }

        }).catch(err => {
            this.beep()
            this.helper.toast('Leitor não encontrado', { color: 'secondary' });
        });

    }

    async showAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Buscar produto',
            inputs: [
                {
                    name: 'text',
                    type: 'text',
                    placeholder: 'Nome ou codigo'
                }],
            buttons: [
                {
                    text: 'Buscar',
                    handler: (data) => {
                        this.search(data.text)
                    }
                },
                {
                    text: 'Cancelar',
                    cssClass: 'danger',
                    handler: () => {

                    }
                }
            ]
        });

        return await alert.present();
    }



    beep() {
        this.nativeAudio.preloadSimple('uniqueId1', './assets/beep-scanner.mp3').then(onSuccess => { }, onError => { });
        this.nativeAudio.play('uniqueId1').then(onSuccess => { }, onError => { });
    }

}
