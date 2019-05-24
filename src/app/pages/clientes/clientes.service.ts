import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import Model from 'src/app/service/model';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends Model {
  public clientes;
  public clientToEdit;
  public clientToShow;
  protected url = 'client/partner';
  
  constructor(http: HttpClient,  helper: HelperService) { super(http, helper) }

  getSum(id, parans?){
    return this.http.get<any>(`${this.urlApi}/${this.url}/${id}/orders/sum?${parans}`).pipe(
      retry(1),
      catchError(error => of( this.helper.message(error)))
  );
  }

  
}
