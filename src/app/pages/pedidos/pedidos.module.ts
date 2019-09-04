import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { ModalMotoboyComponent } from './listar-pedidos/modal-motoboy/modal-motoboy.component';

import { IonicModule } from '@ionic/angular';
import { PedidosPage } from './pedidos.page';
import { PedidosService } from './pedidos.service';
import { PedidoMesasComponent } from './pedido-mesas/pedido-mesas.component';

import { MesasService } from '../mesas/mesas.service';
import { MostraPedidoComponent } from './mostra-pedido/mostra-pedido.component';

import { BrMaskerModule } from 'br-mask';
import { ModalPaymentComponent } from './mostra-pedido/modal-payment/modal-payment.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FinalizeOrderModule } from './finalize-order/finalize-order.module';


const routes: Routes = [
    {
        path: '',
        component: PedidosPage,
        children: [
            {
                path: '',
                redirectTo: 'lista',
                pathMatch: 'full'
            },
            {
                path: 'lista',
                component: ListarPedidosComponent
            },
            {
                path: 'detalhes/:id',
                component: MostraPedidoComponent
            },
            {
                path: 'mesas',
                component: PedidoMesasComponent
            }
        ]
    }
];

@NgModule({
    entryComponents: [
        ModalMotoboyComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        BrMaskerModule,
        FinalizeOrderModule
    ],
    declarations: [
        PedidosPage,
        ListarPedidosComponent,
        PedidoMesasComponent,
        MostraPedidoComponent,
        ModalMotoboyComponent,
    ],
    providers: [PedidosService, MesasService]
})
export class PedidosPageModule { }
