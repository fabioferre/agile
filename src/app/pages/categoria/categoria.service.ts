import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(
        private http: HttpClient,
        private helper: HelperService) { }

    public get(): Observable<any> {
        return this.http.get<any>(`${this.helper.url}/categories`).pipe(
            retry(2)
        );
    }
}
