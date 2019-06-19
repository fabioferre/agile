import { AlertController, ModalController } from '@ionic/angular';
import { Controller } from './../../../service/controller';
import { HomeService } from './../home.service';
import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';


@Component({
    selector: 'app-lista-produtos',
    templateUrl: './lista-produtos.component.html',
    styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent extends Controller implements OnInit {
    @Input() public products: any;
    public displayedColumns: string[] = ['select','id', 'image', 'name', 'unity', 'sale_price'];
    public selection:any;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        public homeService: HomeService,
        private helper: HelperService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController
    ) { super(alertCtrl) }

    ngOnInit() {
        this.updateDataTable(this.products);
        this.dataSource.sort = this.sort;
        this.selection = this.homeService.selection;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
     
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

  

    putOrder(product): void {
        if(!this.homeService.buildingProduct) {
            if(this.selection.isSelected(product)) {
                this.homeService.removeProductSelected(product)
            } else {
                if(this.verifyStock(product)) {
                    this.homeService.productSelected.push(product)
                }
            }
        } else{
            this.buildProduct(product);
        }
    }
    

    public buildProduct(product) {
        if(this.verifyStock(product)) {
            this.homeService.toggleProductBuilded(product);
        }
    }


    public verifyStock(product) {
        
        if(product.units <= 0 && product.stock) {
            this.helper.message('Produto sem estoque!','warning');
            this.selection.toggle(product);
            return false;
        } else {
            return true;
        }
    }

}
