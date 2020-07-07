import { SelectionModel } from '@angular/cdk/collections';
import { HelperService } from './../../service/helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends Model {
    protected url = 'orders';
    public productSelected: any[] = [];
    public selection = new SelectionModel<any>(true, this.productSelected);
    public client: any;
    public table: any;
    // tslint:disable-next-line: variable-name
    public order_id: number;
    public productAlert: boolean;
    public loadOrders: boolean;
    public freight: number;

    public buildingProduct: boolean;
    public buildedProducts: any = [];
    public finalProductBuilded: any;

    public productModal: any;
    public isVisible: boolean;
    public onRemoveOrder: Subject<any> = new Subject();
    constructor(
        http: HttpClient,
        helper: HelperService,

    ) { super(http, helper); }

    get totalPrice() {
        let total = 0;
        for (const product of this.productSelected) {
            total = total + this.getTotalSale(product);
        }

        if(this.freight) {
            this.freight = Number(this.freight);
        }
        return total;
    }


    get totalItens() {
        return this.productSelected.length;
    }

  

    public removeProductSelected(product): void {
        this.onRemoveOrder.next(product.id);
        this.productSelected.splice(this.productSelected.indexOf(product), 1);
    }


    public plusProduct(product, event) {
        const idx = this.productSelected.indexOf(product);
        if (product.stock) {

            if (this.productSelected[idx].qtd < product.units) {
                this.productSelected[idx].qtd++;
            } else {
                this.helper.toast('Limite no estoque!', {color: 'secondary'});
            }
        } else {

            this.productSelected[idx].qtd++;
        }

    }

    public lessProduct(product, event) {
        const idx = this.productSelected.indexOf(product);
        if (this.productSelected[idx].qtd > 1) {
            this.productSelected[idx].qtd--;
        }
    }



    public getTotalSale(product) {
        let price = 0;
        if (product.aditional_price) {
            price = product.aditional_price;
        }

        price +=  product.sale_price * product.qtd;
        return price ;
    }

    public removeProducUnits(listProducts) {
        for (const product of listProducts) {
            if (!product.old && product.stock) {
                const idx = this.productSelected.indexOf(product);
                this.productSelected[idx].units -= product.qtd;
                this.productSelected[idx].qtd = 1;
            }
        }

        this.productSelected.map((product) => {
            this.selection.deselect(product);
        });
    }

    public clearPainel(removeProducts = true): void {

        this.client = null;
        this.table = null;
        this.order_id = null;
        this.freight = 0;
        this.isVisible = false;

        if (removeProducts) { this.productSelected = []; }

    }
    public selectClient(client) {
        this.client = client;

        if (client.freight) {
            this.freight = parseFloat(client.freight.freight) ;
        }
    }



    public toggleBuild() {
        this.buildedProducts.forEach((product) => this.selection.deselect(product));
        this.productSelected.forEach((product) => this.selection.deselect(product));
        if (this.buildingProduct) {
            this.buildingProduct = false;
            this.buildedProducts = [];
            this.productSelected.forEach((product) => this.selection.select(product));
        } else {
            this.buildingProduct = true;
        }
    }


    public toggleProductBuilded(product) {
        const idx = this.buildedProducts.indexOf(product);
        if (idx < 0) {
            this.buildedProducts.push(product);
        } else {
            this.buildedProducts.splice(idx, 1);
        }
    }




}
