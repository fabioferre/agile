import { PedidosService } from './../../../pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-statements-modal',
  templateUrl: './statements-modal.component.html',
  styleUrls: [
    './statements-modal.component.scss',
    './../../../pedidos/mostra-pedido/mostra-pedido.component.scss',
    './../../../home/painel-pedido/painel-pedido.component.scss'
  ],
})
export class StatementsModalComponent implements OnInit {
  public order: any;
  public orderShow: boolean;
  constructor(public pedidosService: PedidosService,
    public params : NavParams) { }

  ngOnInit() {
 
    this.pedidosService.getById(this.params.get('order_id')).subscribe((order) => {
      this.order = order;
    });
  }

}
