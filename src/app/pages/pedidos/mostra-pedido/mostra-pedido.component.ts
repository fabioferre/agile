import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { HelperService } from 'src/app/service/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImpressoraService } from '../../sistema/impressora.service';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { HttpErrorResponse } from '@angular/common/http';

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
                   
                });
            });
        } else {
            this.order = this.orderService.orderToFinalize;
        }
    }


    public prepareFinalized() {
        this.modalPayment();
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


    finalize() {
        this.order.status = 2;
        this.orderService.changeStatus(this.order).subscribe((order: any) => {
           
            if (order) {
                this.helper.toast('Pedido finalizado!');
                this.orderService.orderToFinalize = order;
                this.router.navigate(['/pedidos']);
                if (this.impressora.printer_options) {
                    if (this.impressora.printer_options.close) {
                        this.impressora.printer(order);
                    }
                }
            }
        }, (error: HttpErrorResponse) => this.orderService.handleError(error));
    }
    ngOnDestroy(): void {
        this.orderService.orderToFinalize = [];
    }
}
