import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ImpressoraService extends Model {
  public printer_options: any;
  printers:any;
  protected url = 'printer'
  protected urlApi = 'http://localhost:3002';
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

  printer(request){
    console.log(request)
    let dado =   {
      "order": request.id,
      "total": request.total,
      "type": request.type,
      "freight": request.freight,
      "printer_options": this.printer_options,
      "products": request.products,
      "client": request.client,
      "table": request.table
  }
  console.log(dado)
 
    this.create( dado).subscribe();
  }



}
