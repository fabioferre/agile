import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends Model {

  public pedidos;
  public orderToFinalize;
  protected url = 'orders'
  constructor(http :HttpClient , helper : HelperService) { super(http, helper)}

  public removeOrder(order): void {
     let re = this.pedidos.splice(this.pedidos.indexOf(order), 1)
     console.log(re)
  }

  public changeStatus(order) {
    return this.http.put(`${this.requestURL}/status/order${order.id}`, order)
  }
}
