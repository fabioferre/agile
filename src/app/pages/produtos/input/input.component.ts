import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Controller } from '../../../service/controller';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends Controller implements OnInit {
  public displayedColumns = ['created_at', 'tye', 'quantity', 'current_cost_price', 'action'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public productService: ProdutoService,
    private router: Router,
    public alertCtrl: AlertController) { super(alertCtrl) }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    if (!this.productService.flows) {
      this.productService.get().subscribe(flows => this.setFlows(flows));
    } else {
      this.setFlows(this.productService.flows)
    }

  }

  public setFlows(data) {
    this.productService.products = data;
    this.dataSource.data = this.productService.flows;
    this.dataSource._updateChangeSubscription();
  }

}
