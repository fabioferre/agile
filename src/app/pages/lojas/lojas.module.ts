import { LojasService } from './lojas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarLojaComponent  } from './editar-loja/editar-loja.component'
import { ListarLojasComponent } from './listar-lojas/listar-lojas.component'
import { NovaLojaComponent } from './nova-loja/nova-loja.component'
import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { LojasPage } from './lojas.page';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: LojasPage,
    children:[
      {
        path: '',
        component: ListarLojasComponent
      },
      {
        path: 'novo',
        component: NovaLojaComponent
      },
      {
        path: 'editar',
        component: EditarLojaComponent 
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
    MaterialModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LojasPage, EditarLojaComponent, ListarLojasComponent, NovaLojaComponent],
  providers:[LojasService]
})
export class LojasPageModule {}
