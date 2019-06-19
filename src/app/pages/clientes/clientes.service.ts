import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import Model from 'src/app/service/model';
import { retry, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends Model {

  public clientes;
  public clientToEdit;
  public clientToShow;
  protected url = 'client/partner';

  constructor(http: HttpClient, helper: HelperService) { super(http, helper) }

  getSum(id, parans?) {
    return this.http.get<any>(`${this.urlApi}/${this.url}/${id}/orders/sum?${parans}`).pipe(
      retry(1),
      catchError(error => of(this.helper.message(error)))
    );
  }

  statement(id, parans?) {
    this.helper.load();
    let urlParans = '';
    $.each(parans, function(e,i){
        urlParans = `${urlParans}&${e}=${JSON.stringify(i)}`;
    });
    return this.http.get<any>(`${this.urlApi}/client/account/${id}/statement?${urlParans}`).pipe(
      retry(10),
      finalize(() => {
        this.isLoading = false;
          this.helper.load(false);
      }),
      catchError(error =>  of( this.helper.message(error)))
  );
  }

  movement(id, parans?) {
    this.helper.load();
    return this.http.post<any>(`${this.urlApi}/client/account/${id}/movement`, parans).pipe(
        finalize(() => {
          this.isLoading = false;
            this.helper.load(false);
        }),
        catchError(error => of( this.helper.message(error)))
    )
  }


}
