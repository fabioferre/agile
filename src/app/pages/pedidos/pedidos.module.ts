import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { ModalMotoboyComponent } from './listar-pedidos/modal-motoboy/modal-motoboy.component';

import { IonicModule } from '@ionic/angular';
import { PedidosPage } from './pedidos.page';
import { PedidosService } from './pedidos.service';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { PedidoMesasComponent } from './pedido-mesas/pedido-mesas.component';

import { MesasService } from '../mesas/mesas.service';
import { MostraPedidoComponent } from './mostra-pedido/mostra-pedido.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';

import { ModalRegistraClienteComponent } from './pedidos-cliente/modal-registra-cliente/modal-registra-cliente.component';
import { BrMaskerModule } from 'br-mask';

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
            },
            {
                path: 'clientes',
                component: PedidosClienteComponent
            }
        ]
    }
];

@NgModule({
    entryComponents: [
        ModalMotoboyComponent,
        ModalRegistraClienteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterModule.forChild(routes),
        BrMaskerModule
    ],
    declarations: [
        PedidosPage,
        ListarPedidosComponent, 
        PedidoMesasComponent,
        MostraPedidoComponent,
        ModalMotoboyComponent,
        PedidosClienteComponent,
        ModalRegistraClienteComponent
    ],
    providers: [PedidosService, MesasService]
})
export class PedidosPageModule { }
