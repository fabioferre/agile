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
    public productAlert: boolean;
    public loadOrders: boolean;
    public freight: number;

    public buildingProduct: boolean;
    public buildedProducts: any = [];
    public finalProductBuilded: any;
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

  

    public removeProductSelected(product): void {
        this.productSelected.splice(this.productSelected.indexOf(product), 1);
 
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
            if(!product.old && product.stock ) {
                const idx = this.productSelected.indexOf(product);
                this.productSelected[idx].units -= product.qtd;
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

        
        if(removeProducts) { this.productSelected = [];  }
         
    }
    public  selectClient(client) {
        this.client = client;
  
        if(client.freight) {
            this.freight = client.freight.freight;
        }
    }
    


    public toggleBuild() {
        this.buildedProducts.forEach((product) => this.selection.deselect(product));
        this.productSelected.forEach((product) => this.selection.deselect(product));
        if(this.buildingProduct) {
            this.buildingProduct = false;
            this.buildedProducts = [];
            this.productSelected.forEach((product) => this.selection.select(product));
        } else {
            this.buildingProduct = true;
        }
    }

  
    public toggleProductBuilded(product) {
        const idx = this.buildedProducts.indexOf(product);
        if(idx < 0) {
            this.buildedProducts.push(product);
        } else {
            this.buildedProducts.splice(idx, 1);
        }
    }


    public finalizeBuild() {
        let productToSend = {id:null, sale_price: 0, name: '', custom: true, qtd: 1, stock: false, fractioned: null, collection:null };
     
        for(const product of this.buildedProducts) {
            productToSend.name += product.name + ' ½ ';
            
            if(product.sale_price > productToSend.sale_price) {
                productToSend.id = product.id;
                productToSend.sale_price = product.sale_price;
            }
           
        }
       
        this.productSelected.push( productToSend);
        this.toggleBuild();
    }

    

}
