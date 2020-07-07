import { PedidosService } from './../pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalMotoboyComponent } from './modal-motoboy/modal-motoboy.component';
import { Controller } from 'src/app/service/controller';
import  * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent extends Controller implements OnInit {
    public displayedColumns: string[] = ['status', 'created_at', 'number','client_name', 'type', 'total', 'action'];
    @ViewChild(MatSort) sort: MatSort;
    public form: FormGroup = this.fb.group({
        status: [[1, 3, 4], Validators.required]
    });

    constructor(
        public orderService: PedidosService,
        private router: Router,
        private helper: HelperService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private fb: FormBuilder
    ) { super(alertCtrl); }

    ngOnInit() {
        this.orderService.dataSource.sort = this.sort;
        this.getOrders();

        this.form.valueChanges.subscribe(() => {
            this.getOrders()
        });
    }


    public getOrders()
    {
        const date = this.helper.momentDate().add(-24, 'hours').format('Y-MM-DD');
        this.orderService.get({
            filter: [
                ['created_at', '>=', date]
            ],
            whereIn: ['status', this.form.get('status').value]
        }).subscribe((pedidos: any[]) => {
            pedidos.map(e => {
                if(e.client) {
                    e.client_name = e.client.name
                }
            });
            this.orderService.dataSource.data = pedidos;
            this.orderService.dataSource._updateChangeSubscription();
        });
    }
    public applyFilter(filterValue: string) {
        this.orderService.dataSource.filter = filterValue.trim().toLowerCase();
    }
    public delete(order): void {
        const orderToChange = order;
        orderToChange.status = 0;
        this.orderService.changeStatus(orderToChange).subscribe(response => {
            const idx = this.orderService.dataSource.data.indexOf(order);
            this.orderService.dataSource.data[idx] = response;
            this.orderService.dataSource._updateChangeSubscription();
            this.helper.toast(`Pedido ${order.number} cancelado `);
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
        });

        return await modal.present();
    }
}
