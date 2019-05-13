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
    public productSelected: any;
    public client: any;
    selection =  new SelectionModel<any>(true, this.productSelected);
    constructor(
        protected http: HttpClient, 
        protected helper: HelperService
    ) { super(http, helper); }

    

    public removeProductSelected(product): void {
        this.productSelected.splice(this.productSelected.indexOf(product), 1)
    }

    
    public plusProduct(product, event) {
        const idx = this.productSelected.indexOf(product);
        if( this.productSelected[idx].qtd < product.units) {
            this.productSelected[ idx ].qtd++;
        }
    }

    public lessProduct(product, event) {
        const idx = this.productSelected.indexOf(product);
        if( this.productSelected[idx].qtd > 1 ) {
            this.productSelected[ idx ].qtd--;
        }
    }
    

    public getTotalSale(product) {
        return product.sale_price *  product.qtd;
    }

    public removeUnits(listProducts) {
        for(let product of listProducts) {
            const idx = this.productSelected.indexOf(product);
            this.productSelected[idx].units -=  product.qtd;
        }
    }

    get  totalPrice() {
        let total = 0;
        for(let product of this.productSelected) {
            total = total + this.getTotalSale(product);
        }
        return total;
    }
    
    
}
