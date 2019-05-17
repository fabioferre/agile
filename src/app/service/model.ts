import { HttpClient } from '@angular/common/http';
import { retry, finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HelperService } from './helper.service';
import * as $ from 'jquery';
export default class Model {
    isLoading = false;
    protected url;
    constructor(
        protected http: HttpClient,
        protected helper: HelperService) {

    }

    public get(parans?): Observable<any> {
      this.load();
     
        let urlParans = '';
        $.each(parans, function(e,i){
            console.log(e)
            console.log(i)
            urlParans = `${urlParans}${e}=${JSON.stringify(i)}&`;
        })
        console.log(urlParans);
        return this.http.get<any>(`${this.helper.url}/${this.url}?${urlParans}`).pipe(
            retry(10),
            finalize(() => {
                this.isLoading = false;
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
        this.load();
        return this.http.get<any>(`${this.helper.url}/${this.url}/${id}`).pipe(
            retry(10),
            finalize(() => {
                this.isLoading = false;
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public updateById(id, params): Observable<any> {
        this.load();
        return this.http.put<any>(`${this.helper.url}/${this.url}/${id}`, params).pipe(
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public create(params): Observable<any>  {
        this.load();
        return this.http.post<any>(`${this.helper.url}/${this.url}`, params).pipe(
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public deleteById(id): Observable<any> {
        this.load();
        return this.http.delete<any>(`${this.helper.url}/${this.url}/${id}`).pipe(
            retry(1),
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
                this.helper.message("Item excluido", "danger")
              
            }),
            catchError(error =>  of( this.helper.message(error)))
        )
    }

    private load(){
        this.isLoading = true;
        const load =  this.helper.load().then();
        load.then(a => {
          a.present().then(() => {
            if (!this.isLoading) {
              a.dismiss().then();
            }
          });
        });
    }


}