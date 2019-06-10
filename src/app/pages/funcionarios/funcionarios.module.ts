import { FuncionariosService } from './funcionarios.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './listar-funcionario/listar-funcionario.component';
import { NovoFuncionarioComponent } from './novo-funcionario/novo-funcionario.component';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

import { FuncionariosPage } from './funcionarios.page';
import { MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatCardModule } from '@angular/material';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosPage,
    children:[
      {
        path: '',
        component: ListarFuncionarioComponent
      },
      {
        path: 'novo',
        component: NovoFuncionarioComponent
      },
      {
        path: 'editar',
        component: EditarFuncionarioComponent 
      },
      {
        path: 'permissao/:id',
        component: PermissionsComponent
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
    BrMaskerModule,
    MatTabsModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FuncionariosPage, 
    ListarFuncionarioComponent, 
    NovoFuncionarioComponent, 
    EditarFuncionarioComponent,
    PermissionsComponent
  ],
  providers:[FuncionariosService]
})
export class FuncionariosPageModule {}
