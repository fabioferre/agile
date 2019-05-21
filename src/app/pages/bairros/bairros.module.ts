import { BairrosService } from './bairros.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarBairrosComponent } from './editar-bairros/editar-bairros.component';
import { ListarBairrosComponent } from './listar-bairros/listar-bairros.component';
import { NovoBairrosComponent } from './novo-bairros/novo-bairros.component';

import { IonicModule } from '@ionic/angular';

import { BairrosPage } from './bairros.page';
import { MatInputModule, MatSelectModule, MatSlideToggleModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: BairrosPage,
    children:[
      {
        path: '',
        component:ListarBairrosComponent
      },
      {
        path: 'novo',
        component:  NovoBairrosComponent
      },
      {
        path: 'editar',
        component:  EditarBairrosComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
  ],
  declarations: [BairrosPage, EditarBairrosComponent, ListarBairrosComponent, NovoBairrosComponent],
  providers:[BairrosService]
})
export class BairrosPageModule {}
