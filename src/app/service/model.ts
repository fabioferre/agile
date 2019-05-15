import { HttpClient } from '@angular/common/http';
import { retry, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

export default class Model {

    protected url;
    constructor(
        protected http: HttpClient,
        protected helper: HelperService) {

    }

    public get(parans?): Observable<any> {

        return this.http.get<any>(`${this.helper.url}/${this.url}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.load(false);
            })
        );

    }

    public getNoLoad(parans?): Observable<any> {

        return this.http.get<any>(`${this.helper.url}/${this.url}`).pipe(
            retry(1),
       
        );

    }

    public getById(id): Observable<any> {
        this.helper.load();
        return this.http.get<any>(`${this.helper.url}/${this.url}/${id}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.load(false);
            })
        )
    }

    public updateById(id, params): Observable<any> {
        this.helper.load();
        return this.http.put<any>(`${this.helper.url}/${this.url}/${id}`, params).pipe(
            finalize(() => {
                this.helper.load(false);
            })
        )
    }

    public create(params): Observable<any>  {
        this.helper.load();
        return this.http.post<any>(`${this.helper.url}/${this.url}`, params).pipe(
            finalize(() => {
                this.helper.load(false);
            })
        )
    }

}