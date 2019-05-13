import { CategoriasService } from './categorias.service';
import { HelperService } from './../../service/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from './produto.service';
@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.page.html',
    styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

    constructor(public productService: ProdutoService,
        public categoriasService :CategoriasService,
        public helper: HelperService) { }

    ngOnInit() {

        if (!this.productService.products) {

            this.productService.get().subscribe(products => {
                this.productService.products = products;

            });


        }


    }


}
