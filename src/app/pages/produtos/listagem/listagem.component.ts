import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Controller } from '../../../service/controller';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent  extends Controller implements OnInit {
    public displayedColumns = [ 'name', 'sale_price', 'category', 'unity', 'action'];
    public onlyReplenish: boolean;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public productService: ProdutoService,
        private router: Router,
        public auth: AuthService,
        public alertCtrl: AlertController ) { super(alertCtrl)}

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.productService.get().subscribe(products => this.setProducts(products));
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

    public replenishStock() {
        this.onlyReplenish = true;
        this.dataSource.data =  this.productService.products.filter((product) => {
            if(product.stock && product.units <= product.minimum_units) {
                return product;
            }
        });
        this.dataSource._updateChangeSubscription()
    }

    public removereplenishStockFilter() {
        this.dataSource.data = this.productService.products;
        this.dataSource._updateChangeSubscription();
        this.onlyReplenish = false;
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

