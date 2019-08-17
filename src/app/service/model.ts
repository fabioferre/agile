import { HttpClient } from '@angular/common/http';
import { retry, finalize, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HelperService } from './helper.service';
import * as $ from 'jquery';
import { LoadingController } from '@ionic/angular';
import { async } from 'q';

export default class Model {
    isLoading = false;
    public elementToedit;
    public ne = false;
    protected url;
    protected urlApi = 'http://tagmus/api';
    // protected urlApi = 'http://www.tagmus.com.br/api';
    constructor(
        protected http: HttpClient,
        protected helper: HelperService) {

    }

    public checkNE(): void {
        if(!this.ne) {
            window.history.go(-1);
        }
    }

    public activeNE(elementToedit?): void {
        this.ne= true;
        if(elementToedit !== undefined) {
            this.elementToedit = elementToedit;
           
        }
    }

    public get(parans: any = ''): Observable<any> {
      this.load();
     
        let urlParans = '';
        $.each(parans, function(e,i){
            urlParans = `${urlParans}&${e}=${JSON.stringify(i)}`;
        });

        return this.http.get<any>(`${this.urlApi}/${this.url}?${urlParans}`).pipe(
            retry(10),
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error =>  of( this.helper.message(error)))
        );
        

    }

    public getNoLoad(parans: any = ''): Observable<any> {

        return this.http.get<any>(`${this.urlApi}/${this.url}?${parans}`).pipe(
            retry(1),
            catchError(error => of( this.helper.message(error)))
        );

    }

    public getById(id?): Observable<any> {
        this.load();
        return this.http.get<any>(`${this.urlApi}/${this.url}/${id}`).pipe(
            retry(10),
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public updateById(id, params): Observable<any> {
        this.load();
        return this.http.put<any>(`${this.urlApi}/${this.url}/${id}`, params).pipe(
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public create(params): Observable<any>  {
        this.load();
        return this.http.post<any>(`${this.urlApi}/${this.url}`, params).pipe(
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => of( this.helper.message(error)))
        )
    }

    public createNoLoad(params): Observable<any>  {

        return this.http.post<any>(`${this.urlApi}/${this.url}`, params).pipe(
            catchError(error => of( this.helper.message(error)))
        )
    }

    public deleteById(id): Observable<any> {
        this.load();
        return this.http.delete<any>(`${this.urlApi}/${this.url}/${id}`).pipe(
            retry(1),
            finalize(() => {
                this.isLoading = false;
                this.helper.load(false);
                this.helper.message("Efetuado com sucesso")
              
            }),
            catchError(this.handleError)
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


    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}