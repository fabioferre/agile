import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { NovoPedidosComponent } from './novo-pedidos/novo-pedidos.component';


import { IonicModule } from '@ionic/angular';

import { PedidosPage } from './pedidos.page';
import { PedidosService } from './pedidos.service';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosPage, ListarPedidosComponent, NovoPedidosComponent],
  providers:[PedidosService]
})
export class PedidosPageModule {}
