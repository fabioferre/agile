import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutosPage } from './produtos.page';
import { ListagemComponent } from './listagem/listagem.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';

// materialize
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
const routes: Routes = [
    {
        path: '',
        component: ProdutosPage,
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'novo',
                component: NovoComponent
            },
            {
                path: 'editar/:id',
                component: EditarComponent
            },
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
        MatInputModule
    ],
    declarations: [
        ProdutosPage,
        NovoComponent,
        EditarComponent,
        ListagemComponent
    ]
})
export class ProdutosPageModule { }
