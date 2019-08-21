import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPaymentComponent } from '../mostra-pedido/modal-payment/modal-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';

@NgModule({
  entryComponents: [
    ModalPaymentComponent
  ],
  declarations: [
    ModalPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    BrMaskerModule
  ],
  exports: [
  ]
})
export class FinalizeOrderModule { }
