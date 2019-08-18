import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { AlertController } from '@ionic/angular';
import { Controller } from 'src/app/service/controller';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-fluxo',
  templateUrl: './fluxo.component.html',
  styleUrls: ['./fluxo.component.scss'],
})
export class FluxoComponent extends Controller implements OnInit {

  public displayedColumns = ['created_at', 'name', 'type', 'quantity', 'current_cost_price', 'action'];
  public flow;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public stockService: StockService,
    public alertCtrl: AlertController) { super(alertCtrl) }

  ngOnInit() {
    this.dataSource.sort = this.sort;
 
    if (!this.stockService.flows) {
     
      this.stockService.get().subscribe(data => this.updateDataTable(data));
    } else {
      this.updateDataTable(this.stockService.flows)
    }
    
  }
  inputProduct(){

  }

  outProduct(){

  }

  delete(data) {
    console.log(data)
    this.stockService.deleteById(data.id).subscribe(response => {
        const idx = this.dataSource.data.indexOf(data)
        this.dataSource.data.splice(idx , 1);
        console.log(idx)
        this.updateDataTable( this.dataSource.data)
    });

}

async search(element) {
  const alert = await this.alertCtrl.create({
      header: 'Tem certeza?',
      buttons: [
          {
              text: 'Não',
              handler: () => {

              }
          },
          {
              text: 'Sim',
              cssClass: 'danger',
              handler: () => {

                  this.delete(element);

              }
          }
      ]
  });

  return await alert.present();
}

}
