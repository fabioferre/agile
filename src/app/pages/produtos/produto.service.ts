import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    public products;
    constructor(private http: HttpClient, private helper: HelperService) { }

    public get(): Observable<any> {
        return this.http.get<any>(`${this.helper.url}/products`).pipe(
            retry(2)
        )
    }

    public store(product):  Observable<any> {
        return this.http.post<any>(`${this.helper.url}/products/store`, product);
    }
} 