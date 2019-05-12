import { ClientesService } from './clientes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [ClientesPage, EditarClienteComponent, ListarClienteComponent, NovoClienteComponent],
  providers:[ClientesService]
})
export class ClientesPageModule {}