import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImpressoraComponent } from './impressora/impressora.component'
import { Printer } from '@ionic-native/printer/ngx';

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
    RouterModule.forChild(routes)
  ],
  declarations: [SistemaPage, ImpressoraComponent, SecurityComponent],
  providers:[SistemaService, Printer]
})
export class SistemaPageModule {}
