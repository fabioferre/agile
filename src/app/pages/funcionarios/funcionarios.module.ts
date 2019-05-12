import { FuncionariosService } from './funcionarios.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './listar-funcionario/listar-funcionario.component';
import { NovoFuncionarioComponent } from './novo-funcionario/novo-funcionario.component';
import { IonicModule } from '@ionic/angular';

import { FuncionariosPage } from './funcionarios.page';

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
  declarations: [FuncionariosPage, ListarFuncionarioComponent, NovoFuncionarioComponent, EditarFuncionarioComponent],
  providers:[FuncionariosService]
})
export class FuncionariosPageModule {}
