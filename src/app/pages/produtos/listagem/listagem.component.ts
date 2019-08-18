import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Controller } from '../../../service/controller';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent  extends Controller implements OnInit {
    public displayedColumns = ['number', 'image', 'name', 'sale_price', 'category', 'unity', 'action'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public productService: ProdutoService,
        private router: Router,
        public alertCtrl: AlertController ) { super(alertCtrl)}

    ngOnInit() {
        this.dataSource.sort = this.sort;
        if (!this.productService.products) {
            this.productService.get().subscribe(products => this.setProducts(products));
        } else {
            this.setProducts(this.productService.products)
        }
    }

    public setProducts(products) {
        this.productService.products = products;
        this.dataSource.data = this.productService.products;
        this.dataSource._updateChangeSubscription();
    }

    public edit(product): void {
        this.productService.activeNE( product );
        this.router.navigate(['/produtos/editar', product.id]);
    }




    delete(product) {

        this.productService.deleteById(product.id).subscribe(response => {
            const idx = this.productService.products.indexOf(product)
            this.productService.products.splice(idx , 1);
            this.dataSource.data  = this.productService.products;
            this.dataSource._updateChangeSubscription();

        });

    }

}

