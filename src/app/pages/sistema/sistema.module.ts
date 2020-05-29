
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImpressoraComponent } from './impressora/impressora.component'
import { ThermalPrintModule } from 'ng-thermal-print';

import { IonicModule } from '@ionic/angular';

import { SistemaPage } from './sistema.page';
import { SistemaService } from './sistema.service';
// materialize

import { SecurityComponent } from './security/security.component';
import { BrMaskerModule } from 'br-mask';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: SistemaPage,
    children: [
      {
          path: 'impressora',
          component: ImpressoraComponent
      },
      {
        path: 'security',
        component: SecurityComponent
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
    ThermalPrintModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SistemaPage, ImpressoraComponent, SecurityComponent],
  providers:[SistemaService]
})
export class SistemaPageModule {}
