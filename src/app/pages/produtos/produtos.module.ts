import { ModalFluxoComponent } from './modal-fluxo/modal-fluxo.component';
import { StockService } from './stock.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ProdutosPage } from './produtos.page';
import { ListagemComponent } from './listagem/listagem.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NeProductComponent } from './ne-product/ne-product.component';
import { FluxoComponent } from './fluxo/fluxo.component';


// materialize
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


// service
import { CategoriasService } from './categorias.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatChipsModule, MatIconModule } from '@angular/material';
import { ModalNecategoryComponent } from './categorias/modal-necategory/modal-necategory.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


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
                component: NeProductComponent,
            },
            {
                path: 'categorias',
                component: CategoriasComponent
            },
            {
                path: 'fluxo',
                component: FluxoComponent
            }
        ]

    }
];

@NgModule({
    entryComponents: [
        ModalNecategoryComponent,
        ModalFluxoComponent
    ],
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
        BrMaskerModule,
        CKEditorModule,
        MatIconModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatListModule
    ],
    declarations: [
        ProdutosPage,
        ListagemComponent,
        CategoriasComponent,
        NeProductComponent,
        ModalNecategoryComponent,
        FluxoComponent,
        ModalNecategoryComponent,
        ModalFluxoComponent
    ],
    providers: [CategoriasService, StockService, BarcodeScanner,NativeAudio,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
})
export class ProdutosPageModule { }
