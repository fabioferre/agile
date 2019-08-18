import { ModalFluxoComponent } from './../modal-fluxo/modal-fluxo.component';
import { ProdutoService } from 'src/app/pages/produtos/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { AlertController, ModalController } from '@ionic/angular';
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
  public productsFiltered;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private modalCtrl: ModalController,
    public produtoService: ProdutoService,
    public stockService: StockService,
    public alertCtrl: AlertController) { super(alertCtrl) }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    if (!this.stockService.flows) {

      this.stockService.get().subscribe(data => this.updateDataTable(data));
    } else {
      this.updateDataTable(this.stockService.flows)
    }

    if (!this.produtoService.products) {
      this.produtoService.get().subscribe(data => this.produtoService.products  = data);
    }

  }
  inputProduct() {

  }

  outProduct() {

  }

  delete(data) {

    this.stockService.deleteById(data.id).subscribe(response => {
      const idx = this.dataSource.data.indexOf(data)
      this.dataSource.data.splice(idx, 1);
      this.updateDataTable(this.dataSource.data)
    });

  }

  async modalFound(data) {

    const modal = await this.modalCtrl.create({
        component: ModalFluxoComponent,
        cssClass: 'sm responsive',
        componentProps: {
          'product_id': data.id,
          'current_cost_price': data.cost_price,
          'name': data.name,
          'units': data.units
  
        }
    });

    return await modal.present();
}


  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Buscar produto',
      inputs: [
        {
          name: 'text',
          type: 'text',
          placeholder: 'Nome ou codigo'
        }],
      buttons: [
        {
          text: 'Buscar',
          handler: (data) => {
        
            this.search(data.text)

          }
        },
        {
          text: 'Saida',
          cssClass: 'danger',
          handler: () => {

          }
        }
      ]
    });

    return await alert.present();
  }

  search(text: string) {
  
    
    text = text.toLowerCase().trim();
     this.productsFiltered = this.produtoService.products.filter((product: any) => {
      product.code =  product.code ? product.code : "";
      if(product.name.toLowerCase().includes(text) || product.code.toLowerCase().includes(text)) {
        return product;
      }  
  
    });

    if(this.productsFiltered ){
      this.modalFound(this.productsFiltered)
    }
    


  }

  

}
