import { CategoriaService } from './categoria.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component'
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component'
import { IonicModule } from '@ionic/angular';

import { CategoriaPage } from './categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaPage,
    children:[
      {
        path: '',
        component: ListarCategoriaComponent
      },
      {
        path: 'editar',
        component:  EditarCategoriaComponent
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
  declarations: [CategoriaPage, EditarCategoriaComponent, ListarCategoriaComponent ],
  providers:[CategoriaService]
})
export class CategoriaPageModule {}
