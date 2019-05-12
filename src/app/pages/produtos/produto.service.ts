import { Injectable } from '@angular/core';

import Model from 'src/app/service/model';


@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends Model{
    protected url = 'products'
    public products;
    public productToEdit;
    public categories;
    constructor(http, helper) { super(http, helper)}

    // public get(): Observable<any> {
    //     return this.http.get<any>(`${this.helper.url}/products`).pipe(
    //         retry(2)
    //     )
    // }

    // public store(product):  Observable<any> {
    //     return this.http.post<any>(`${this.helper.url}/products`, product);
    // }


    
} 