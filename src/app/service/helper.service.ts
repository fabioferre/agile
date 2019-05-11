import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiURL = 'http://tagmus.com.br/api';
  constructor() { }


  get url() {
    return this.apiURL;
  }
}
