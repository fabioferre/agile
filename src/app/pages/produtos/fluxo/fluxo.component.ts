import { ModalFluxoComponent } from './../modal-fluxo/modal-fluxo.component';
import { ProdutoService } from 'src/app/pages/produtos/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatDialog } from '@angular/material';
import { AlertController, ModalController } from '@ionic/angular';
import { Controller } from 'src/app/service/controller';
import { StockService } from '../stock.service';

@Component({
    selector: 'app-fluxo',
    templateUrl: './fluxo.component.html',
    styleUrls: ['./fluxo.component.scss'],
})
export class FluxoComponent extends Controller implements OnInit {

    public displayedColumns = ['created_at', 'name', 'type', 'quantity', 'current_cost_price', 'current_quantity'];
    public flow;
    public productsFiltered;

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private modalCtrl: ModalController,
        public produtoService: ProdutoService,
        public stockService: StockService,
        public alertCtrl: AlertController,
        public dialog: MatDialog
    ) { super(alertCtrl) }

    ngOnInit() {
        this.dataSource.sort = this.sort;

        this.stockService.get().subscribe(data => {
            this.stockService.flows = data;
            this.updateDataTable(data);
        });

        if (!this.produtoService.products) {
            this.produtoService.get().subscribe(data => this.produtoService.products = data);
        }

    }


    delete(data) {

        this.stockService.deleteById(data.id).subscribe(response => {
            const idx = this.dataSource.data.indexOf(data)
            this.dataSource.data.splice(idx, 1);
            this.updateDataTable(this.dataSource.data)
        });

    }

     modalFound() {
        const modal = this.dialog.open(ModalFluxoComponent, {
            minWidth: '250px',
            minHeight: '250px',
            maxWidth: '450px',
            panelClass: 'custom-dialog'
        });
        modal.afterClosed().subscribe(() =>  this.updateDataTable(this.stockService.flows));
    }




}
