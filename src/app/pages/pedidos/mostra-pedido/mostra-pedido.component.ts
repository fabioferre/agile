import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { HelperService } from 'src/app/service/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImpressoraService } from '../../sistema/impressora.service';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';

@Component({
    selector: 'app-mostra-pedido',
    templateUrl: './mostra-pedido.component.html',
    styleUrls: ['./mostra-pedido.component.scss', '../../home/painel-pedido/painel-pedido.component.scss'],
})
export class MostraPedidoComponent implements OnInit, OnDestroy {
    public order: any;
    @Input() public orderShow: any;
    constructor(
        public orderService: PedidosService,
        private routerActive: ActivatedRoute,
        public homeService: HomeService,
        public helper: HelperService,
        private router: Router,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private impressora: ImpressoraService
    ) { }

    ngOnInit() {
        this.impressora.getOptions().then(res => {
            this.impressora.printer_options = res;
        });

        if (!this.orderService.orderToFinalize) {
            this.routerActive.params.subscribe(parans => {
                this.orderService.getById(parans.id).subscribe(order => {
                    this.order = order;
                    this.orderService.orderToFinalize = this.order;
                    console.log(this.orderService.orderToFinalize);
                });
            });
        } else {
            this.order = this.orderService.orderToFinalize;
        }
    }


    async modalPayment() {
        const modal = await this.modalCtrl.create({
            component: ModalPaymentComponent,
            cssClass: 'sm responsive'
        });
        this.orderService.activeNE();
        modal.onDidDismiss().then(() => {
            this.order = this.orderService.orderToFinalize;
        });

        return await modal.present();
    }


    ngOnDestroy(): void {
        this.orderService.orderToFinalize = [];
    }
}
