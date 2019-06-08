import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';

import { ProdutosPage } from './produtos.page';
import { ListagemComponent } from './listagem/listagem.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NeProductComponent } from './ne-product/ne-product.component';

// materialize
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

//service
import { ProdutoService } from './produto.service';
import { CategoriasService } from './categorias.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';


const routes: Routes = [
    {
        path: '',
        component: ProdutosPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'lista'
            },
            {
                path: 'lista',
                component: ListagemComponent
            },
            {
                path: 'novo',
                component: NeProductComponent,
            },
            {
                path: 'editar/:id',
                component: EditarComponent
            },
            {
                path: 'categorias',
                component: CategoriasComponent
            }
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
        MatFormFieldModule,
        MatTabsModule,
        MatCardModule,
        BrMaskerModule
    ],
    declarations: [
        ProdutosPage,
        NovoComponent,
        EditarComponent,
        ListagemComponent,
        CategoriasComponent,
        NeProductComponent
    ],
    providers: [ CategoriasService,
        {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
    ]
})
export class ProdutosPageModule { }
