import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FretesPage } from './fretes.page';
import { ListarFretesComponent } from './listar-fretes/listar-fretes.component';
import { FretesService } from './fretes.service';
import { BrMaskerModule } from 'br-mask';
import { NeFretesComponent } from './ne-fretes/ne-fretes.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
