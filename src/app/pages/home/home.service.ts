import { HelperService } from './../../service/helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends Model {
    public productSelected: any;
   
    constructor(
        protected http: HttpClient, 
        protected helper: HelperService
    ) { super(http, helper); }

    get  totalPrice() {
        let total = 0;
        // for(let product of this.productSelected) {
        //     total = product.
        // }

        return total;
    }

    public removeProductSelected(product): void {
        this.productSelected.splice(this.productSelected.indexOf(product), 1)

    }

    
    public plusProduct(product): void {
        console.log(product, 'produto selecioado')
        this.productSelected[this.productSelected.indexOf(product)].qtd++;
        console.log(this.productSelected[this.productSelected.indexOf(product)], 'produto aumetado')
    }

    public lessProduct(product): void {
        this.productSelected[this.productSelected.indexOf(product)].qtd--;
    }
    

    
    
}
