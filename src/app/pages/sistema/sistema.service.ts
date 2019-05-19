import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  public printer_options =  {
    "company_name":  "Tagmus",
    "rate_service": null,
    "copy": null,
    "font_size": ""
   };
  constructor(private storage: Storage,) { }

  public getPrinter(): any {
    return new Observable(observer => {
      observer.next(this.storage.get('printer_options').then(res => { return res; }));
    }).pipe(
      retry(10)
    );
   
  }

  setPrinter(){
    this.storage.set('printer_options', this.printer_options);
  
  }
}
