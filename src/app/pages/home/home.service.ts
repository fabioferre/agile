import { SelectionModel } from '@angular/cdk/collections';
import { HelperService } from './../../service/helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends Model {
    protected url = 'orders';
    public productSelected: any = [];
    public selection = new SelectionModel<any>(true, this.productSelected);
    public client: any;
    public table: any;
    public order_id: number;


    constructor(
         http: HttpClient,
         helper: HelperService
    ) { super(http, helper); }

    get totalPrice() {
        let total = 0;
        for (let product of this.productSelected) {
            total = total + this.getTotalSale(product);
        }
        return total;
    }

    get frete() {
        return 0;
    }

    public removeProductSelected(product): void {
        this.productSelected.splice(this.productSelected.indexOf(product), 1)
    }


    public plusProduct(product, event) {
        const idx = this.productSelected.indexOf(product);
        if (product.stock) {
            
            if (this.productSelected[idx].qtd < product.units) {
                this.productSelected[idx].qtd++;
            }else{
                this.helper.message("Limite no estoque!", "secondary")
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
        return product.sale_price * product.qtd;
    }

    public removeProducUnits(listProducts) {
        for (let product of listProducts) {
            if(!product.old) {
                const idx = this.productSelected.indexOf(product);
                this.productSelected[idx].units -= product.qtd;
            }
        }
    }

    public clearPainel(): void {
        this.productSelected = [];
        this.client = null;
        this.table = null;
        this.order_id = null;
        this.selection.clear();
    }
    public  selectClient(client) {
        this.client = client;
    }
    


}
