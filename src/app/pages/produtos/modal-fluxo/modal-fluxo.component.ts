import { StockService } from './../stock.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-modal-fluxo',
  templateUrl: './modal-fluxo.component.html',
  styleUrls: ['./modal-fluxo.component.scss'],
})
export class ModalFluxoComponent implements OnInit {
  public barcodeOptions: BarcodeScannerOptions;
  public productsFiltered: any = { 'id': null, 'name': '-----', 'cost_price': 0.00, 'units': 0 };
  public form: FormGroup = this.fb.group({
    quantity: [1, Validators.required],
    product_id: [null,  Validators.required],
    product: [null, Validators.required],
    current_cost_price: [0, Validators.required],
    type: [1, Validators.required]
  });
  
  filteredOptions: Observable<any[]>;

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
      this.product.valueChanges.subscribe((valor)=>{
        this.productsFiltered = valor
        if(!valor.id){
          this.helper.toast('Produto não encontrado', {color:'secondary'});
            return false;
        }
        this.form.controls.product_id.setValue(valor.id);
        this.form.controls.current_cost_price.setValue(valor.cost_price);
      });

      this.filteredOptions = this.product.valueChanges
        .pipe(
          startWith(''),
          map(value => this.search(value))
        );
    }


    get product() {
      return this.form.controls.product;
    }



    displayFn(product?) {
      return product ? product.name : undefined;
    } 

    search(text: any) {
      text = text.toString().toLowerCase().trim();
      return   this.produtoService.products.filter((product: any) => {
        product.code = product.code ? product.code : "";
        if (product.name.toLowerCase().includes(text) || product.code.toLowerCase().includes(text)) {
          if(product.stock){
            return product;
          }
         
        }
      });
  
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
    if (this.quantity.value < 0) {
      this.form.controls.type.setValue(0);
    }

    this.stockService.create(this.form.value).subscribe(data => {
      this.beep()
      this.helper.toast('Registro efetuado !');
      this.modalCtrl.dismiss();
      this.stockService.flows.push(data);
    });

  }

  encode(textToEncode) {

    return  this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textToEncode).then((data) => {
      return data ;
    }, (err) => {
      return err;
    })
  }

  scanner() {
    this.barcodeOptions = {
      prompt: 'Codigo de barras do produto'
    };

    this.barcodeScanner.scan(this.barcodeOptions).then(barcodeData => {
      
      let dados = this.search(barcodeData.text)[0]
      if(dados){
        this.product.setValue(dados) ;
      }

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

  

  beep() {
    this.nativeAudio.preloadSimple('uniqueId1', './assets/beep-scanner.mp3').then(onSuccess => { console.log("foi") }, onError => { console.log(onError) });
    this.nativeAudio.play('uniqueId1').then(onSuccess => { console.log("foi") }, onError => { console.log(onError) });
  }

}
