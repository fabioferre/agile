import { MesasService } from './mesas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MesasPage } from './mesas.page';
import { ModalEditaMesaComponent } from './modal-edita-mesa/modal-edita-mesa.component';
import { ModalNovaMesaComponent } from './modal-nova-mesa/modal-nova-mesa.component';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
    {
        path: '',
        component: MesasPage
    }
];

@NgModule({
    entryComponents: [
        ModalEditaMesaComponent, 
        ModalNovaMesaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        BrMaskerModule
    ],
    declarations: [
        MesasPage, 
        ModalEditaMesaComponent, 
        ModalNovaMesaComponent
    ],
    providers: [MesasService]
})
export class MesasPageModule { }
