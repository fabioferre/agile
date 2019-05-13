import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends Model {

  public pedidos;
  protected url = 'orders'
  constructor(http :HttpClient , helper : HelperService) { super(http, helper)}
}
