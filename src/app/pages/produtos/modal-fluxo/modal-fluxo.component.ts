import { StockService } from './../stock.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-modal-fluxo',
  templateUrl: './modal-fluxo.component.html',
  styleUrls: ['./modal-fluxo.component.scss'],
})
export class ModalFluxoComponent implements OnInit {
  public options: BarcodeScannerOptions;
  public productsFiltered: any = { 'id': null, 'name': '-----', 'cost_price': 0.00, 'units': 0 };
  public form: FormGroup = this.fb.group({
    quantity: [1, Validators.required],
    product_id: [null, Validators.required],
    current_cost_price: [null, Validators.required],
    type: [1, Validators.required]
  });

  constructor(
    private nativeAudio: NativeAudio,
    private barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    private helper: HelperService,
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    public stockService: StockService,
    public produtoService: ProdutoService) { }

  ngOnInit() {

  }

  get quantity() {
    return this.form.controls.quantity;
  }


  plus() {
    let sum = parseInt(this.quantity.value) + 1;
    this.quantity.setValue(sum);
  }

  less() {
    let sum = parseInt(this.quantity.value) - 1;
    this.quantity.setValue(sum);
  }

  save() {
    if (this.quantity.value === 0) {
      this.helper.toast('Informe a quantidade', {color:'secondary'});
      return false;
    }
    if (Math.sign(this.quantity.value)) {
      this.form.controls.type.setValue(0);
    }

    this.stockService.create(this.form.value).subscribe(data => {
      this.beep()
      this.helper.toast('Registro efetuado !');
      this.modalCtrl.dismiss();
      this.stockService.flows.push(data);
    });

  }

  encode() {
    var textToEncode = window.prompt("enter text to encode");
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textToEncode).then((data) => {
      alert(JSON.stringify(data));
    }, (err) => {
      alert(JSON.stringify(err));
    })
  }

  scanner() {
    this.options = {
      prompt: 'Codigo de barras do produto'
    };

    this.barcodeScanner.scan(this.options).then(barcodeData => {
      this.search(barcodeData);

    }).catch(err => {
      this.beep()
      this.helper.toast('Leitor não encontrado',{color :  'secondary'});
    });

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
          text: 'Cancelar',
          cssClass: 'danger',
          handler: () => {

          }
        }
      ]
    });

    return await alert.present();
  }

  search(text: any) {
    text = text.toString().toLowerCase().trim();
    var productsFiltered = this.produtoService.products.filter((product: any) => {
      product.code = product.code ? product.code : "";
      if (product.name.toLowerCase().includes(text) || product.code.toLowerCase().includes(text)) {
        return product;
      }
    });

    if (!productsFiltered[0]) {
      this.helper.toast('Produto não encontrado', {color :'danger'})
      this.productsFiltered = { 'id': null, '----': 'Produto', 'cost_price': 0.00, 'units': 0 };
      return false;
    }

    if (!productsFiltered[0].stock) {
      this.helper.toaste('Não possui controle de estoque', {color : 'secondary'})
      return false;
    }

    this.helper.toast('Produto encontrado')
    this.productsFiltered = productsFiltered[0];
    this.productsFiltered = productsFiltered[0]
    this.form.controls.product_id.setValue(this.productsFiltered.id);
    this.form.controls.current_cost_price.setValue(this.productsFiltered.cost_price)

  }

  beep() {
    this.nativeAudio.preloadSimple('uniqueId1', './assets/beep-scanner.mp3').then(onSuccess => { console.log("foi") }, onError => { console.log(onError) });
    this.nativeAudio.play('uniqueId1').then(onSuccess => { console.log("foi") }, onError => { console.log(onError) });
  }

}
