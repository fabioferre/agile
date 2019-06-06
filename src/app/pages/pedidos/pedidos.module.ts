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

import { BrMaskerModule } from 'br-mask';
import { BairrosService } from '../bairros/bairros.service';

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
        ModalMotoboyComponent
    ],
    providers: [PedidosService, MesasService, BairrosService]
})
export class PedidosPageModule { }
