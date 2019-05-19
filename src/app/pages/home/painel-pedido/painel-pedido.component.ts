import { HelperService } from './../../../service/helper.service';
import { HomeService } from './../home.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, AlertController, } from '@ionic/angular';
import { ClienteModalComponent } from '../modal/cliente-modal/cliente-modal.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Router } from '@angular/router';
import { TableModalComponent } from '../modal/table-modal/table-modal.component';



@Component({
    selector: 'app-painel-pedido',
    templateUrl: './painel-pedido.component.html',
    styleUrls: ['./painel-pedido.component.scss'],
})
export class PainelPedidoComponent implements OnInit {
    public form = this.fb.group({
        total: [0],
        products: [[], Validators.required],
        client_id: [null],
        table_id: [null],
        form_payment: ['', Validators.required],
        description: [''],
        type: [1]
    });

    public types = {
        selling1: true,
        selling2: false,
        selling3: false,
        selling4: false,
    };

    constructor(
        private modalCtrl: ModalController,
        public homeService: HomeService,
        private alertCtrl: AlertController,
        private fb: FormBuilder,
        private helper: HelperService,
        private printer: Printer,
        private router: Router
    ) { }

    ngOnInit() {
        this.checkSelling();
    }   

    public changeActive(typeToActive): void {
        for( let type  in this.types) {
            this.types[type] = false;
        }
        this.setTypeSelling = typeToActive;
        this.types[`selling${typeToActive}`] = true
    }

    public checkSelling() {
        if( (this.types.selling2 || this.types.selling3) && this.homeService.client) {

            this.form.addControl('client', new FormControl( this.homeService.client) );
            this.form.controls.client_id.setValue(this.homeService.client.id) ;

        } else if( this.homeService.table) {
            this.form.addControl('table', new FormControl( this.homeService.table) );
            this.form.controls.table_id.setValue(this.homeService.table.id) ;
            this.changeActive(4);
        } else {
            this.changeActive(1);
        }
     
    }
    
    set setTypeSelling(type) {
        this.form.controls.type.setValue(type);
    }

    async modalClient(type?) {
        this.homeService.client = null;
        this.homeService.table = null;

        const modal = await this.modalCtrl.create({
            component: ClienteModalComponent,
        });
        modal.onDidDismiss().then(()=> {
            this.checkSelling()
        });
        return await modal.present();
    }

    async modalTable(type?) {
        const modal = await this.modalCtrl.create({
            component: TableModalComponent
        });
        modal.onDidDismiss().then(()=> {
            this.checkSelling()
        });
        return await modal.present();
    }
    public prepareSale(): void {
        this.form.controls.total.setValue(this.homeService.totalPrice);
        this.form.controls.products.setValue(this.homeService.productSelected);
    }
    async showPayment() {
        this.prepareSale();
        const alert = await this.alertCtrl.create({
            header: 'Forma de pagamento',
            inputs: [
                {
                    name: 'form_payment',
                    type: 'radio',
                    label: 'Dinheiro',
                    value: 'dinheiro'
                },
                {
                    name: 'form_payment',
                    type: 'radio',
                    label: 'Credito',
                    value: 'credito'
                },
                {
                    name: 'form_payment',
                    type: 'radio',
                    label: 'Debito',
                    value: 'debito'
                },
            ],
            buttons: [
                {
                    text: 'cancelar',
                    handler: () => {
                       
                    }
                },
                {
                    text: 'Pagar',
                    cssClass: 'success',
                    handler: (form_payment) => {
                        if (form_payment) {
                            this.form.controls.form_payment.setValue(form_payment)
                            this.storeOrder();
                        } else {

                        }
                    }
                }
            ]
        });

        return await alert.present();
    }


    public storeOrder() {
        if(this.form.valid) {
            this.homeService.create(this.form.value).subscribe((response) => {
                this.homeService.removeProducUnits(this.form.value.products);
                this.homeService.clearPainel();
                this.changeActive(1);
                this.helper.message("Pedido efetuado");
            });
        } else {
            this.helper.message('Selecione ao menos um produto', 'warning')
        }
    }

    public updateOrder(order_id): void {
        this.prepareSale();
        this.homeService.updateById(order_id, this.form.value).subscribe(response => {
            this.homeService.removeProducUnits(this.form.value.products);
            this.homeService.clearPainel();
            this.changeActive(1);
            this.helper.message("Pedido acrescentado");
        });
    }

}

