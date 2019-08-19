import { StockService } from './../stock.service';
import { Component, OnInit } from '@angular/core';
import { ModalController,  AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { BarcodeScanner, BarcodeScannerOptions  } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-modal-fluxo',
  templateUrl: './modal-fluxo.component.html',
  styleUrls: ['./modal-fluxo.component.scss'],
})
export class ModalFluxoComponent implements OnInit {
  public options : BarcodeScannerOptions;
  public productsFiltered;
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
    this.quantity.setValue(parseInt(this.quantity.value) + 1);
  }

  less() {
    this.quantity.setValue(parseInt(this.quantity.value) - 1);
  }

  save() {
    if (Math.sign(this.quantity.value)) {
      this.form.controls.type.setValue(0);
    }
    this.stockService.create(this.form.value).subscribe(data => {
      this.helper.message('Registro efetuado !');
      this.modalCtrl.dismiss();
      this.stockService.flows.push(data)
    });

  }
  encode(){
    var textToEncode = window.prompt("enter text to encode");
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textToEncode).then((data)=>{
      alert(JSON.stringify(data));
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
  scanner() {
    this.options = {
      prompt: 'Codigo de barras do produto'
    };

    this.barcodeScanner.scan(this.options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      this.beep()
      this.helper.message('Leitor não encontrado', 'secondary')
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
      product.code = product.code ? product.code : "";
      if (product.name.toLowerCase().includes(text) || product.code.toLowerCase().includes(text)) {
        return product;
      }
    });
    if (this.productsFiltered[0]) {
      this.beep()
      this.form.controls.product_id.setValue(this.productsFiltered[0].id);
      this.form.controls.current_cost_price.setValue(this.productsFiltered[0].cost_price)
      this.helper.message('Produto encontrado')
    }else{
      this.helper.message('Produto não encontrado', 'danger')
    }

  }

  beep(){
    this.nativeAudio.preloadSimple('uniqueId1', './assets/beep-scanner.mp3').then(onSuccess=> {console.log("foi")}, onError => { console.log(onError) });
  this.nativeAudio.play('uniqueId1').then(onSuccess=> {console.log("foi")}, onError => { console.log(onError) });
  }

}
