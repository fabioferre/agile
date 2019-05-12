import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ListarMotoboyComponent } from './listar-motoboy/listar-motoboy.component';
import { EditarMotoboyComponent } from './editar-motoboy/editar-motoboy.component';
import { NovoMotoboyComponent } from './novo-motoboy/novo-motoboy.component';
import { IonicModule } from '@ionic/angular';

import { MotoboyPage } from './motoboy.page';
import { MotoboyService } from './motoboy.service';
import { MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: MotoboyPage,
    children:[
      {
        path: '',
        component: ListarMotoboyComponent
      },
      {
        path: 'novo',
        component:  NovoMotoboyComponent
      },
      {
        path: 'editar',
        component:  EditarMotoboyComponent
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
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MotoboyPage, ListarMotoboyComponent, EditarMotoboyComponent,  NovoMotoboyComponent],
  providers:[MotoboyService]
})
export class MotoboyPageModule {}
