import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-mostra-pedido',
    templateUrl: './mostra-pedido.component.html',
    styleUrls: ['./mostra-pedido.component.scss'],
})
export class MostraPedidoComponent implements OnInit, OnDestroy {
    public order: any;
    constructor(
        public orderService: PedidosService, 
        private routerActive: ActivatedRoute, 
        public homeService: HomeService,
        public helper: HelperService,
        private router: Router
    ) { }

    ngOnInit() {
        if(!this.orderService.orderToFinalize){
            this.routerActive.params.subscribe(parans => {
                
                this.orderService.getById(parans.id).subscribe(order => {
                    this.order = order ;
                    console.log(order)
                })
            })
        } else {
            this.order = this.orderService.orderToFinalize;
        }
    }


    finalize() {
        this.order.status = 2;
        this.orderService.changeStatus(this.order).subscribe(order => {
            this.helper.message('Pedido finalizado!');
            this.router.navigate(['/pedidos']);
        });
    }

    ngOnDestroy(): void {
        this.orderService.orderToFinalize = [];
    }
}
