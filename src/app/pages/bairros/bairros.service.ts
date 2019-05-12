import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BairrosService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  public get(): Observable<any> {
    return this.http.get<any>(`${this.helper.url}/products`).pipe(
      retry(2)
    )
  }

  public getById(){

  }

  public update(){
    
  }
}
