import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FretesPage } from './fretes.page';
import { ListarFretesComponent } from './listar-fretes/listar-fretes.component';
import { FretesService } from './fretes.service';
import { MatInputModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrMaskerModule } from 'br-mask';
import { NeFretesComponent } from './ne-fretes/ne-fretes.component';

const routes: Routes = [
  {
    path: '',
    component: FretesPage,
    children:[
      {
        path: '',
        component: ListarFretesComponent
      },
      {
        path: 'ne',
        component: NeFretesComponent
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
    RouterModule.forChild(routes)
  ],
  declarations: [FretesPage, NeFretesComponent,  ListarFretesComponent],
  providers:[FretesService]
})
export class FretesPageModule {}
