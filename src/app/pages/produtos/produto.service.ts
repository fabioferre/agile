import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Model from 'src/app/service/model';
import { HelperService } from 'src/app/service/helper.service';




@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends Model{
    protected url = 'products'
    public products;
    public productToEdit;
    public categories;

    public ne = false;
    
    public weight_types = [
        {
            id: 1,
            name:  'Kg'
        },
        {
            id: 2,
            name:  'g'
        },
        {
            id: 3,
            name: 'Mg'
        },
        {
            id: 4,
            name: 'L'
        },
        {
            id: 5,
            name:'ml'
        }
    ];
    constructor(http :HttpClient , helper : HelperService) { super(http, helper)}

    public checkNE(): void {
        if(!this.ne) {
            window.history.go(-1);
        }
    }

    public activeNE(productToEdit?): void {
        this.ne = true;
        if(productToEdit !== undefined) {
            this.productToEdit = productToEdit;
        } 
    }


    public verifyStock(product) {
        if(product.units <= 0 && product.stock) {
            this.helper.message('Produto sem estoque!','warning');
            return false;
        } else {
            return true;
        }
    }
   
} 