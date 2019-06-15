import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';
import { finalize, catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SistemaService extends Model {
  protected url = 'auth/roles'
  constructor(http :HttpClient , helper : HelperService) { super(http, helper)}


  public updateRoles(id, params): Observable<any> {
    this.helper.load();
    return this.http.put<any>(`${this.urlApi}/auth/roles/${id}`, params).pipe(
        finalize(() => {
            this.helper.load(false);
        }),
        catchError(error => of( this.helper.message(error)))
    )
}

public getRole(id): Observable<any> {
  return this.http.get<any>(`${this.urlApi}/${this.url}/${id}`).pipe(
      retry(2),
      catchError(error => of( this.helper.message(error)))
  );

}

}
