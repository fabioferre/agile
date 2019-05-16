import { HttpClient } from '@angular/common/http';
import { retry, finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HelperService } from './helper.service';

export default class Model {

    protected url;
    constructor(
        protected http: HttpClient,
        protected helper: HelperService) {

    }

    public get(parans?): Observable<any> {
        this.helper.load();
        return this.http.get<any>(`${this.helper.url}/${this.url}?${parans}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.load(false);
            }),
            catchError(error =>  of( this.helper.message(error)))
        );

    }

    public getNoLoad(parans?): Observable<any> {

        return this.http.get<any>(`${this.helper.url}/${this.url}?${parans}`).pipe(
            retry(1),
            catchError(error => of( this.helper.message(error)))
        );

    }

    public getById(id): Observable<any> {
        this.helper.load();
        return this.http.get<any>(`${this.helper.url}/${this.url}/${id}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public updateById(id, params): Observable<any> {
        return this.http.put<any>(`${this.helper.url}/${this.url}/${id}`, params).pipe(
            finalize(() => {
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public create(params): Observable<any>  {
        return this.http.post<any>(`${this.helper.url}/${this.url}`, params).pipe(
            finalize(() => {
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public deleteById(id): Observable<any> {
  
        this.helper.load();
        return this.http.delete<any>(`${this.helper.url}/${this.url}/${id}`).pipe(
            retry(1),
            finalize(() => {
                this.helper.message("Item excluido", "danger")
              
            }),
            catchError(error =>  of( this.helper.message(error)))
        )
    }


}