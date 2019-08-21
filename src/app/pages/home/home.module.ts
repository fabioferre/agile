import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PainelPedidoComponent } from './painel-pedido/painel-pedido.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ClienteModalComponent } from './modal/cliente-modal/cliente-modal.component';
import { Printer } from '@ionic-native/printer/ngx';
import { FormRegisterClientComponent } from './modal/cliente-modal/form-register-client/form-register-client.component';
import { ClientesService } from '../clientes/clientes.service';
import { BrMaskerModule } from 'br-mask';
import { ComplementsModalComponent } from './modal/complements-modal/complements-modal.component';
import { FinalizeOrderModule } from '../pedidos/finalize-order/finalize-order.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PedidosService } from '../pedidos/pedidos.service';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents: [
    ClienteModalComponent,
    ComplementsModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    BrMaskerModule,
    FinalizeOrderModule
  ],
  declarations: [
    HomePage,
    PainelPedidoComponent,
    ListaProdutosComponent,
    ClienteModalComponent,
    ComplementsModalComponent,
    FormRegisterClientComponent
  ],
  providers: [ClientesService, Printer, PedidosService]
})
export class HomePageModule { }
