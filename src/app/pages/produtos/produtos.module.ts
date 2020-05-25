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


// service
import { CategoriasService } from './categorias.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatChipsModule, MatIconModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { ModalNecategoryComponent } from './categorias/modal-necategory/modal-necategory.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { MaterialModule } from 'src/app/material/material.module';


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
        MaterialModule,
        RouterModule.forChild(routes),
        BrMaskerModule,
        CKEditorModule,
        MatTooltipModule,
        MatDialogModule
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
