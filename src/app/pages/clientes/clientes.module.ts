import { ClientesService } from './clientes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ShowClienteComponent } from './show-cliente/show-cliente.component'

import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { StatementsClienteComponent } from './show-cliente/statements-cliente/statements-cliente.component';
import { PerfilClienteComponent } from './show-cliente/perfil-cliente/perfil-cliente.component';
import { HistoricoClienteComponent } from './show-cliente/historico-cliente/historico-cliente.component';
import { StatementsModalComponent } from './show-cliente/statements-modal/statements-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage,
    children: [
      {
        path: '',
        component: ListarClienteComponent
      },
      {
        path: 'novo',
        component: NovoClienteComponent
      },
      {
        path: 'editar',
        component: EditarClienteComponent
      },
      {
        path: 'show/:id',
        component: ShowClienteComponent,
        children: [
          {
            path: '',
            pathMatch:'full', redirectTo: 'perfil'
          },
          {
            path: 'perfil',
            component: PerfilClienteComponent
          },
          {
            path: 'extrato',
            component: StatementsClienteComponent
          },
          {
            path: 'historico',
            component: HistoricoClienteComponent
          }

        ]
      }
    ]
  }
];

@NgModule({
  entryComponents:[StatementsModalComponent],
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
    BrMaskerModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ClientesPage,
    EditarClienteComponent,
    ListarClienteComponent,
    NovoClienteComponent,
    ShowClienteComponent,
    StatementsClienteComponent,
    PerfilClienteComponent,
    HistoricoClienteComponent,
    StatementsModalComponent
  ],
  providers: [ClientesService]
})
export class ClientesPageModule { }
