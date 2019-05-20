import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ImpressoraService extends Model {
  public printer_options = {
    "company_name": "Tagmus",
    "rate_service": null,
    "copy": null,
    "font_size": "",
    "default": null
  };
  printers:any;
  protected url = 'printer'
  protected requestURL = 'http://localhost:3002';
  constructor(
    http: HttpClient,
    helper: HelperService,
    private storage: Storage
  ) { super(http, helper) }

  public getOptions(){

    return this.storage.get('printer_options');

  }

  setOptions() {
    this.storage.set('printer_options', this.printer_options);
  }

  printer(data, request){
    let dado =   {
      "order": data.id,
      "total": request.total,
      "type": data.type,
      "freight": request.freight,
      "printer_options": this.printer_options,
      "products": request.products,
      "client": request.client,
      "table": request.table
  }
 
    this.create( dado).subscribe();
  }



}
