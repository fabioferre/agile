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

import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SecurityComponent } from './security/security.component';
import { MatCardModule, MatTabsModule } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrMaskerModule } from 'br-mask';

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
    MatSlideToggleModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    BrMaskerModule,
    ThermalPrintModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SistemaPage, ImpressoraComponent, SecurityComponent],
  providers:[SistemaService]
})
export class SistemaPageModule {}
