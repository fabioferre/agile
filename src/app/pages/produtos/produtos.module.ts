import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriaService } from '../categoria/categoria.service';
import { ProdutoService } from './produto.service';


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
                component: NovoComponent,
            },
            {
                path: 'editar',
                component: EditarComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    declarations: [
        ProdutosPage,
        NovoComponent,
        EditarComponent,
        ListagemComponent
    ],
    providers: [ProdutoService]
})
export class ProdutosPageModule { }
