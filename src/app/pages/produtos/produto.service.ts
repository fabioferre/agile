import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Model from 'src/app/service/model';
import { HelperService } from 'src/app/service/helper.service';




@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends Model{
    public products;
    public productToEdit;
    public categories;
    
    protected url = 'products'
    constructor(http :HttpClient , helper : HelperService) { super(http, helper)}

    
} 