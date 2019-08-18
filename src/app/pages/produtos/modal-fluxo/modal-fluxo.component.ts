import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-fluxo',
  templateUrl: './modal-fluxo.component.html',
  styleUrls: ['./modal-fluxo.component.scss'],
})
export class ModalFluxoComponent implements OnInit {
  public units;
  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    qtd: [0, Validators.required],
    product_id: [null, Validators.required],
    current_cost_price: [null, Validators.required]
});

  constructor(  public modalCtrl: ModalController,
    private params: NavParams,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.form.controls.name.setValue(this.params.get('name'));
    this.form.controls.product_id.setValue(this.params.get('product_id'));
    this.form.controls.current_cost_price.setValue(this.params.get('current_cost_price'))
    this.units = this.params.get('units')
   
  }

  get qtd(){
    return this.form.controls.qtd;
  }
  plus(){
    this.qtd.setValue(parseInt(this.qtd.value) + 1);
  }

  less(){
    this.qtd.setValue(parseInt(this.qtd.value) - 1);
  }

}
