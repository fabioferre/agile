import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';
import { HttpClient } from '@angular/common/http';
import Model from 'src/app/service/model';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService extends Model {
    public categories = [];

    protected url = 'categories';
    constructor(http: HttpClient, helper: HelperService) { super(http, helper); }

    public storeComplement(categoryID, form: { name: '', price: '' }) {
        return this.http.post(`${this.urlApi}/${this.url}/${categoryID}/complements`, form);
    }

    public deleteComplement(categoryID, id) {
        return this.http.delete(`${this.urlApi}/${this.url}/${categoryID}/complements/${id}`);
    }

    
}
