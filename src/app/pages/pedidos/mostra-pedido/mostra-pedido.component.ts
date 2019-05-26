import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { HelperService } from 'src/app/service/helper.service';
import { AlertController } from '@ionic/angular';
import { ImpressoraService } from '../../sistema/impressora.service';

@Component({
    selector: 'app-mostra-pedido',
    templateUrl: './mostra-pedido.component.html',
    styleUrls: ['./mostra-pedido.component.scss','../../home/painel-pedido/painel-pedido.component.scss'],
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
        private impressora: ImpressoraService
    ) { }

    ngOnInit() {
        this.impressora.getOptions().then(res => {
            this.impressora.printer_options = res;
        });
        
        if(!this.orderService.orderToFinalize && !this.orderShow){
           
            this.routerActive.params.subscribe(parans => {
                this.orderService.getById(parans.id).subscribe(order => {
                    this.order = order;
                })
            })
        } else {
            if( this.orderShow) {
                this.order = this.orderShow;
            }
            if(this.orderService.orderToFinalize) {
                this.order = this.orderService.orderToFinalize;
            }
        }
    }

    public prepareTofinalize() {
        if(this.order.form_payment) {
            this.finalize();
        } else {
            this.showPayment();
        }
    }

    finalize() {
        this.order.status = 2;
        this.orderService.changeStatus(this.order).subscribe(order => {
            this.helper.message('Pedido finalizado!');
            this.router.navigate(['/pedidos']);
            if(this.impressora.printer_options.close){
                this.impressora.printer(this.order);
            }
        });
    }


    async showPayment() {
        
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
                {
                    name: 'form_payment',
                    type: 'radio',
                    label: 'Conta cliente',
                    value: 'wallet'
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
                            this.order.form_payment = form_payment;
                            this.finalize();
                        } else {
                            this.helper.message('Selecione forma de pagamento!','warning');
                        }
                    }
                }
            ]
        });

        return await alert.present();
    }

    ngOnDestroy(): void {
        this.orderService.orderToFinalize = [];
    }
}
