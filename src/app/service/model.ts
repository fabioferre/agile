import { HttpClient } from '@angular/common/http';
import { retry, finalize, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HelperService } from './helper.service';
import { async } from 'q';

export default class Model {
    public elementToedit;
    public ne = false;
    protected url;
    protected urlApi = 'http://tagmus/api';
    // protected urlApi = 'http://tagmus.com.br/api';
    constructor(
        protected http: HttpClient,
        protected helper: HelperService) {

    }

    public checkNE(): void {
        if (!this.ne) {
            window.history.go(-1);
        }
    }

    public activeNE(elementToedit?): void {
        this.ne = true;
        if (elementToedit !== undefined) {
            this.elementToedit = elementToedit;
        }
    }

    public get(parans: any = ''): Observable<any> {
        this.helper.load();
        let urlParans = '';

        for (const i in parans) {
            if (i) {
                urlParans = `${urlParans}&${i}=${JSON.stringify(parans[i])}`;
            }
        }
        return this.http.get<any>(`${this.urlApi}/${this.url}?${urlParans}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => this.handleError(error))
        );

    }

    public getNoLoad(parans: any = ''): Observable<any> {

        return this.http.get<any>(`${this.urlApi}/${this.url}?${parans}`).pipe(
            retry(1),
            catchError(error => this.handleError(error))
        );

    }

    public getById(id?): Observable<any> {
        this.helper.load();
        return this.http.get<any>(`${this.urlApi}/${this.url}/${id}`).pipe(
            retry(10),
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => this.handleError(error))
        );
    }

    public updateById(id, params): Observable<any> {
        this.helper.load();
        return this.http.put<any>(`${this.urlApi}/${this.url}/${id}`, params).pipe(
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => this.handleError(error))
        );
    }

    public create(params): Observable<any> {
        this.helper.load();
        return this.http.post<any>(`${this.urlApi}/${this.url}`, params).pipe(
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
            }),
            catchError(error => this.handleError(error))
        );
    }

    public createNoLoad(params): Observable<any> {

        return this.http.post<any>(`${this.urlApi}/${this.url}`, params).pipe(
            catchError(error => this.handleError(error))
        );
    }

    public deleteById(id): Observable<any> {
        this.helper.load();
        return this.http.delete<any>(`${this.urlApi}/${this.url}/${id}`).pipe(
            retry(1),
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
                this.helper.toast('Efetuado com sucesso');

            }),
            catchError(error => this.handleError(error))
        );
    }

    handleError(error) {
        // let errorMessage = '';
        // if (error.error instanceof ErrorEvent) {
        //   // client-side error
        //   errorMessage = `Error: ${error.error.message}`;
        // } else {
        //   // server-side error
        //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        // }
        // console.log('deu ruim', errorMessage)
        // this.helper.load(false);
        // window.alert(errorMessage);
        this.helper.message(error);
        this.helper.load(false);
        return throwError(error);
      }

}
