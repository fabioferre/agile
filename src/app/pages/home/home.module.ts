import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { HomePage } from './home.page';
import { PainelPedidoComponent } from './painel-pedido/painel-pedido.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutoService } from '../produtos/produto.service';

// materialize
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteModalComponent } from './modal/cliente-modal/cliente-modal.component';
import {  MatCheckboxModule } from '@angular/material';
import { Printer } from '@ionic-native/printer/ngx';
import { FormRegisterClientComponent } from './modal/cliente-modal/form-register-client/form-register-client.component';
import { ClientesService } from '../clientes/clientes.service';
import { BairrosService } from '../bairros/bairros.service';
import { BrMaskerModule } from 'br-mask';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents: [
    ClienteModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    BrMaskerModule
  ],
  declarations: [
    HomePage, 
    PainelPedidoComponent, 
    ListaProdutosComponent, 
    ClienteModalComponent,
    FormRegisterClientComponent
  ],
  providers: [ ClientesService, BairrosService, Printer]
})
export class HomePageModule {}
