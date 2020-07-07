import { ClientesService } from './../../../clientes/clientes.service';
import { HomeService } from './../../home.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/pages/produtos/produto.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-cliente-modal',
    templateUrl: './cliente-modal.component.html',
    styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cellphone', 'address', 'action'];
    dataSource: any;
    public alertToRegister: boolean;
    public showForm: boolean;
    public clients: any;
    @Input() public clientToEdit: any;
    constructor(
        public modalCrl: ModalController,
        public homeService: HomeService,
        private clientService: ClientesService
    ) { }

    ngOnInit() {
        if(this.clientToEdit) {
            this.showForm = true;
        } else {
            this.clientService.get().subscribe((clients) => {
                if (clients.length > 0) {
                    this.dataSource = new MatTableDataSource<any>(clients);
                } else {
                    this.alertToRegister = true;
                }
            });
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.filteredData.length < 1) {
            this.alertToRegister = true;
        } else {
            this.alertToRegister = false;
        }
    }


    public selectClient(clientSelected) {
        this.homeService.selectClient(clientSelected);

        if (clientSelected.status && this.homeService.loadOrders) {
            this.homeService.productSelected = [];
            this.clientService.getById(clientSelected.id).subscribe(client => {
                const products = JSON.parse(client.products);
                products.map(product => {
                    product.old = true;
                    this.homeService.productSelected.push(product);
                });
                this.homeService.order_id = client.order_id;
                this.homeService.loadOrders = false;
                this.modalCrl.dismiss();
            });

        } else {
            this.homeService.loadOrders = false;
            this.homeService.order_id = null;
            this.homeService.productSelected.forEach(product => {
                if (product.old) {
                    const idx = this.homeService.productSelected.indexOf(product);
                    this.homeService.productSelected.splice(idx, 1);
                }
            });
            this.modalCrl.dismiss();
        }
    }


}
