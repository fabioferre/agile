import { PedidosService } from './../../../pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statements-modal',
  templateUrl: './statements-modal.component.html',
  styleUrls: ['./statements-modal.component.scss'],
})
export class StatementsModalComponent implements OnInit {
  public order: any;
  constructor(public  pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.getById(237).subscribe((order) => {
      this.order = order;
    });
  }

}
