import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Controller } from '../../../service/controller';
import { AuthService } from 'src/app/service/auth.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LojasService } from '../../lojas/lojas.service';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent extends Controller implements OnInit {
    public displayedColumns = ['name', 'cost_price', 'sale_price', 'category', 'minimum_units', 'maximum_units', 'unity', 'action'];
    public onlyReplenish: boolean;

    public form: FormGroup = this.fb.group({
        status: [1, { updateOn: 'blur' }],
        store_id: [0]
    });

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public productService: ProdutoService,
        private router: Router,
        public auth: AuthService,
        private fb: FormBuilder,
        public alertCtrl: AlertController,
        public lojasService: LojasService
    ) { super(alertCtrl) }

    get onlyActive() {
        return this.form.get('status').value == 1;
    }
    ngOnInit() {
        this.dataSource.sort = this.sort;
        console.log(this.auth.store)

        this.getProducts();
        this.form.valueChanges.subscribe(() => {
            this.getProducts();
        });

     
    }

 

    getProducts() {

        let filter = [['status', this.form.value.status]];
        if(this.form.get('store_id').value) {
            filter[1] = ['store_id', this.form.get('store_id').value];
        } 

        this.productService.get({
            filter: filter,
        }).subscribe(products => this.setProducts(products));

    }
    public setProducts(products) {
        this.productService.products = products;
        this.dataSource.data = this.productService.products;
        this.dataSource._updateChangeSubscription();
    }

    public edit(product): void {
        this.productService.activeNE(product);
        this.router.navigate(['/produtos/editar', product.id]);
    }

    public replenishStock() {
        this.onlyReplenish = true;
        this.dataSource.data = this.productService.products.filter((product) => {
            if (product.stock && product.units <= product.minimum_units) {
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
    delete(product, status = 2) {
        product.status = status;
        this.productService.updateById(product.id, {status: status}).subscribe(response => {
            const idx = this.productService.products.indexOf(product)
            this.productService.products.splice(idx, 1);
            this.dataSource.data = this.productService.products;
            this.dataSource._updateChangeSubscription();

        });

    }


}

