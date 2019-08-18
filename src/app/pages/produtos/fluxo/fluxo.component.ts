import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { AlertController } from '@ionic/angular';
import { Controller } from 'src/app/service/controller';

@Component({
  selector: 'app-fluxo',
  templateUrl: './fluxo.component.html',
  styleUrls: ['./fluxo.component.scss'],
})
export class FluxoComponent extends Controller implements OnInit {

  public displayedColumns = ['created_at', 'name', 'type', 'quantity', 'current_cost_price', 'action'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public productService: ProdutoService,
    public alertCtrl: AlertController) { super(alertCtrl) }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    if (!this.productService.flows) {
      this.productService.getFlows().subscribe(data => this.updateDataTable(data));
    } else {
      this.updateDataTable(this.productService.flows)
    }
    
  }

}
