
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriasPage } from './categorias.page';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { NovaCategoriaComponent } from './nova-categoria/nova-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CategoriaService } from './categoria.service';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { BrMaskerModule } from 'br-mask';



const routes: Routes = [
  {
    path: '',
    component: CategoriasPage,
    children: [
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'lista'
      },
      {
          path: 'lista',
          component: ListarCategoriaComponent
      },
      {
          path: 'novo',
          component: NovaCategoriaComponent
      },
      {
          path: 'editar/:id',
          component: EditarCategoriaComponent
      }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    BrMaskerModule
  ],
  declarations: [CategoriasPage, ListarCategoriaComponent, NovaCategoriaComponent, EditarCategoriaComponent],
  providers:[CategoriaService]
})
export class CategoriasPageModule {}
