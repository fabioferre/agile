import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoSubscribePageRoutingModule } from './promo-subscribe-routing.module';

import { PromoSubscribePage } from './promo-subscribe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoSubscribePageRoutingModule
  ],
  declarations: [PromoSubscribePage]
})
export class PromoSubscribePageModule {}
