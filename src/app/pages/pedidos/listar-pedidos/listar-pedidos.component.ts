import { PedidosService } from './../pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalMotoboyComponent } from './modal-motoboy/modal-motoboy.component';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent implements OnInit {
    public displayedColumns: string[] = ['status','created_at', 'id', 'type', 'total', 'action'];
    public dataSource: any;  
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public orderService: PedidosService,
        private router: Router,
        private helper: HelperService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController
    ) { }

    ngOnInit() {
        let date = this.helper.date(null, "-1 day")
        this.orderService.get({
            filter: [
                ['created_at', '>=', date]
            ]
        }).subscribe(pedidos => {
            this.orderService.pedidos = pedidos;
            // console.log(pedidos);
            this.dataSource = new MatTableDataSource<any>(this.orderService.pedidos);
            this.dataSource.sort = this.sort;

        })
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public delete(order): void {
        this.orderService.deleteById(order.id).subscribe(response => {
            this.helper.message(`Pedido ${order.number} removido`);
            this.orderService.removeOrder(order);
        });
    }

    public edit(req): void {
        this.router.navigate(['/motoboy/editar']);
    }

    public finalize(order) {
        this.orderService.orderToFinalize = order;
    }


    async outToDeliver(order) {
        this.orderService.orderToFinalize = order;
        const modal = await this.modalCtrl.create({
            component: ModalMotoboyComponent
        }) ;
        return await modal.present();
    }
}
