import { ClientesService } from './clientes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage,
    children:[
      {
        path: '',
        component: ListarClienteComponent
      },
      {
        path: 'novo',
        component:  NovoClienteComponent
      },
      {
        path: 'editar',
        component:  EditarClienteComponent
      }
    ]
  }
];

@NgModule({
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
  declarations: [ClientesPage, EditarClienteComponent, ListarClienteComponent, NovoClienteComponent],
  providers:[ClientesService]
})
export class ClientesPageModule {}
