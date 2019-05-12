import { MesasService } from './mesas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarMesasComponent  } from './editar-mesas/editar-mesas.component';
import { ListarMesasComponent } from './listar-mesas/listar-mesas.component';
import { NovaMesasComponent } from './nova-mesas/nova-mesas.component';

import { IonicModule } from '@ionic/angular';

import { MesasPage } from './mesas.page';

const routes: Routes = [
  {
    path: '',
    component: MesasPage,
    children:[
      {
        path: '',
        component: ListarMesasComponent
      },
      {
        path: 'novo',
        component: NovaMesasComponent
      },
      {
        path: 'editar',
        component:  EditarMesasComponent
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
  declarations: [MesasPage,  EditarMesasComponent, ListarMesasComponent, NovaMesasComponent],
  providers:[MesasService]
})
export class MesasPageModule {}
