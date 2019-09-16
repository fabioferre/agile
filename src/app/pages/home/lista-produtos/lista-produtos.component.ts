import { AlertController, ModalController } from '@ionic/angular';
import { Controller } from './../../../service/controller';
import { HomeService } from './../home.service';
import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';
import { ComplementsModalComponent } from '../modal/complements-modal/complements-modal.component';


@Component({
    selector: 'app-lista-produtos',
    templateUrl: './lista-produtos.component.html',
    styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent extends Controller implements OnInit {
    @Input() public products: any;
    public displayedColumns: string[] = ['select', 'id', 'image', 'name', 'category_name', 'unity', 'sale_price'];
    public selection: any;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        public homeService: HomeService,
        private helper: HelperService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
    ) { super(alertCtrl); }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.selection = this.homeService.selection;
        this.updateDataTable(this.products);
    }


    async modalComplement(product: any) {
        const modal = await this.modalCtrl.create({
            component: ComplementsModalComponent,
            cssClass: 'sm responsive'
        });
        modal.onDidDismiss().then(() => {
            if (this.homeService.productModal.canAdd) {
                this.homeService.productModal.canAdd = null;
                this.homeService.productSelected.push(this.homeService.productModal);
            } else {
                this.homeService.selection.deselect(this.homeService.productModal);
            }
            this.homeService.productModal = null;
        });

        this.homeService.productModal = product;
        return await modal.present();
    }

    putOrder(product): void {
        if (!this.homeService.buildingProduct) {
            if (this.selection.isSelected(product)) {
                this.homeService.removeProductSelected(product);
            } else {
                if (this.verifyStock(product) && !this.verifyComplements(product)) {
                    this.homeService.productSelected.push(product);
                }

            }
        } else {
            this.buildProduct(product);
        }
    }


    public buildProduct(product) {
        if (this.verifyStock(product)) {
            this.homeService.toggleProductBuilded(product);
        }
    }


    public verifyStock(product) {
        if (product.units <= 0 && product.stock) {
            this.helper.toast('Produto sem estoque!', { color: 'warning' });
            this.selection.toggle(product);
            return false;
        } else {
            return true;
        }
    }

    public verifyComplements(product) {
        
        if (product.complements.length > 0) {
            // this.homeService.productModal = ;
            this.modalComplement(product);
            return true;
        } else {
            return false;
        }
    }


    public finalizeBuild() {
        const productToSend = {
            id: null,
            sale_price: 0,
            name: '',
            custom: true,
            qtd: 1,
            stock: false,
            fractioned: null,
            collection: null,
            complements: null,
            cost_price: 0,
            descriptions: ''
        };
        for (const product of this.homeService.buildedProducts) {
            productToSend.name += product.name + ' 1/2 ';

            if (product.sale_price > productToSend.sale_price) {
                productToSend.id = product.id;
                productToSend.sale_price = product.sale_price;
                productToSend.cost_price = product.cost_price;
                productToSend.complements = product.complements;
            }

        }

        if ( !this.verifyComplements(productToSend) ) {
            this.homeService.productSelected.push(productToSend);
        }
        this.homeService.toggleBuild();
    }
}
