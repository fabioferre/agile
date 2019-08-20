import { HelperService } from './../../../service/helper.service';
import { HomeService } from './../home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, } from '@ionic/angular';
import { ClienteModalComponent } from '../modal/cliente-modal/cliente-modal.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ImpressoraService } from '../../sistema/impressora.service';



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
        private router: Router,
        private impressora: ImpressoraService,
    ) { }

    ngOnInit() {
        this.checkSelling();
        this.impressora.getOptions().then(res => {
            this.impressora.printer_options = res;
        });

    }

    get type() {
        return this.form.controls.type.value;
    }

    set setTypeSelling(type) {
        this.form.controls.type.setValue(type);
    }

    public changeActive(typeToActive): void {
        for (let type in this.types) {
            this.types[type] = false;
        }
        this.setTypeSelling = typeToActive;
        this.types[`selling${typeToActive}`] = true;

    }

    public checkSelling() {
        if ((this.types.selling2 || this.types.selling3) && this.homeService.client) {

            this.form.addControl('client', new FormControl(this.homeService.client));
            this.form.controls.client_id.setValue(this.homeService.client.id);

        } else if (this.homeService.table) {
            this.form.addControl('table', new FormControl(this.homeService.table));
            this.form.controls.table_id.setValue(this.homeService.table.id);
            this.changeActive(4);
        } else {
            this.changeActive(1);
            this.homeService.clearPainel(false);
        }

    }

    async modalClient(type?) {
        this.homeService.clearPainel(false);
        if (type === 3) {
            this.homeService.loadOrders = true;
        }
        const modal = await this.modalCtrl.create({
            component: ClienteModalComponent,
        });
        modal.onDidDismiss().then(() => {
            this.checkSelling()
        });
        return await modal.present();
    }

    public prepareSale(): void {
        this.form.controls.total.setValue(this.homeService.totalPrice);
        this.form.controls.products.setValue(this.homeService.productSelected);
        if (this.form.invalid) {
            this.helper.message('Selecione ao menos um produto', 'warning')
            this.homeService.productAlert = false;
            setTimeout(() => {
                this.homeService.productAlert = true;
            }, 100);

        } else if (this.form.value.type === 1 || this.form.value.type === 2) {
            this.storeOrder();

            this.homeService.productAlert = false;
        } else {
            this.storeOrder();
        }
    }



    public storeOrder() {
        this.homeService.create(this.form.value).subscribe((response) => {
            if (response) {
                this.msgOrder(response.warning);
                this.homeService.removeProducUnits(this.form.value.products);
                this.homeService.clearPainel();
                this.changeActive(1);
                this.helper.message("Pedido efetuado");
                console.log(response)

                if (this.impressora.printer_options.create) {
                    this.impressora.printer(response);
                }
            }


        });
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

    async msgOrder(response) {
        if (response) {

            response.forEach(async (element) => {
                const alert = await this.alertCtrl.create({
                    header: 'Aviso',
                    message: element,
                    buttons: [
                        {
                            text: 'Ok',
                            cssClass: 'success',
                        }
                    ]
                });

                return await alert.present();

            });

        }

    }

}

