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
    public displayedColumns: string[] = ['select', 'id', 'image', 'name', 'category', 'unity', 'sale_price'];
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


    async modalComplement() {
        const modal = await this.modalCtrl.create({
            component: ComplementsModalComponent,
            cssClass: 'sm responsive'
        });
        modal.onDidDismiss().then(() => {
            if (this.homeService.productModal.canAdd) {
                this.homeService.productSelected.push(this.homeService.productModal);
            } else {
                this.homeService.selection.deselect(this.homeService.productModal);
            }
            this.homeService.productModal = null;
        });
        return  await modal.present();
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
            this.helper.message('Produto sem estoque!', 'warning');
            this.selection.toggle(product);
            return false;
        } else {
            return true;
        }
    }

    public verifyComplements( product) {
        console.log(product);
        if (product.complements.length > 0) {
            this.homeService.productModal = product;
            this.modalComplement();
            return true;
        } else {
            return false;
        }
    }

}
