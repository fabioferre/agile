import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';
import { Storage } from '@ionic/storage';
import { async } from 'q';
import { MasterModel } from '../../printer/master-model';
import { PrepareModel } from '../../printer/prepare-model';
import { DeliveryModel } from '../../printer/delivery-model';

import { MiniMasterModel } from '../../printer/mini/master-model';
import { MiniPrepareModel } from '../../printer/mini/prepare-model';
import { MiniDeliveryModel } from '../../printer/mini/delivery-model';

@Injectable({
  providedIn: 'root'
})
export class ImpressoraService extends Model {
  // tslint:disable-next-line: variable-name
  public printer_options: any = {};
  public printers: any = [];
  protected url = 'printer';
  protected urlApi = 'http://localhost:3002';
  public paymentOptions: any = [
    { id: 1, name: 'Cartão Debito / Crédito', icon: 'fa-credit-card' },
    { id: 2, name: 'Vaucher', icon: 'fa-money-check' },
    { id: 3, name: 'Dinheiro', icon: 'fa-money-bill-wave' },
    { id: 4, name: 'Conta cliente', icon: 'fa-wallet', clientAccount: true }
  ];
  constructor(
    http: HttpClient,
    helper: HelperService,
    private storage: Storage
  ) { super(http, helper); }

  public getOptions() {

    return this.storage.get('printer_options');

  }

  setOptions() {

    this.storage.set('printer_options', this.printer_options);
  }

  prepare(request) {
    this.urlApi = this.printer_options.ip ? `http://${this.printer_options.ip}:3002` : "http://localhost:3002";
    var payment = this.paymentOptions.find((opt: any) => {
      if (Number(opt.id) == Number(request.form_payment)) {
        return opt;
      }
    });

    request.form_payment = payment ? payment.name : "";
    const dado = {
      url: this.printer_options.ip ? `http://${this.printer_options.ip}:3002` : "http://localhost:3002",
      cmds: "",
      order: request.number,
      change: request.change,
      form_payment: request.form_payment,
      total: request.total,
      type: request.type,
      freight: request.freight,
      printer_options: this.printer_options,
      products: request.current_products,
      client: request.client,
      table: request.table
    };
    return dado;
  }

  send(model, options: any = {}){
  
    if (options.printer === true) {
      for (var cont = 1; cont <= options.copy; cont++) {
    
        model.build(options.data).execute(options.data);
      }
    
    }

  }


  profissional(request){
    var dados = this.prepare(request)
    const Master = new MasterModel(this.http);
    const Prepare = new PrepareModel(this.http);
    const Delivery = new DeliveryModel(this.http);
    this.send(Master, {data: dados, printer : this.printer_options.master, copy : this.printer_options.copy_master });
    this.send(Prepare, {data: dados, printer : this.printer_options.prepare, copy : this.printer_options.copy_prepare });
      if (dados.type == 2) {
        this.send(Delivery, {data: dados, printer : this.printer_options.delivery, copy : this.printer_options.copy_delivery });
      }

    return false;

  }

  mini(request){
    var dados = this.prepare(request)
    const MiniMaster = new MiniMasterModel(this.http);
    const MiniPrepare = new MiniPrepareModel(this.http);
    const MiniDelivery = new MiniDeliveryModel(this.http);
    this.send(MiniMaster, {data: dados, printer : this.printer_options.master, copy : this.printer_options.copy_master });
    this.send(MiniPrepare, {data: dados, printer : this.printer_options.prepare, copy : this.printer_options.copy_prepare });
      if (dados.type == 2) {
        this.send(MiniDelivery, {data: dados, printer : this.printer_options.delivery, copy : this.printer_options.copy_delivery });
      }

    return false;

  }

  printer(request) {
   
    if (this.printer_options.format == 1) {
      this.mini(request);
    }else{
      this.profissional(request);
    }
  }



  printerStatement(params) {


    const dado = {
      data: params,
      printer_options: this.printer_options,
    };

    return this.http.post(`http://localhost:3002/printer/statement`, dado);

  }




}
