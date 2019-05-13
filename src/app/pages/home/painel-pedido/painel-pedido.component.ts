import { HomeService } from './../home.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ClienteModalComponent } from '../modal/cliente-modal/cliente-modal.component';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

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

    constructor(
        private modalCtrl: ModalController,
        public homeService: HomeService,
        private alertCtrl: AlertController,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.changeActive();
    }   
    get client_id() {
        return this.form.value.client_id;
    }
    get table_id() {
        return this.form.value.table_id;
    }
    async modalClient(request?) {
        const modal = await this.modalCtrl.create({
            component: ClienteModalComponent
        });

        return await modal.present();
    }

    public changeActive(): void {
        $('.painel-item').click(function(){
            $('.painel-item.active').removeClass('active')
            $(this).addClass('active');
        });
    }

    async showPayment() {
        this.form.controls.total.setValue(this.homeService.totalPrice);
        this.form.controls.products.setValue(this.homeService.productSelected);
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
                        if(form_payment) {
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
        console.log(this.form)
        this.homeService.create(this.form.value).subscribe((response) => {
            console.log(response);
            this.homeService.removeUnits(this.form.value.products);
            this.homeService.productSelected = [];
            this.homeService.selection.deselect(this.form.value.products);
        });
    }

}
