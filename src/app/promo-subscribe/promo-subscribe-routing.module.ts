import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoSubscribePage } from './promo-subscribe.page';

const routes: Routes = [
  {
    path: '',
    component: PromoSubscribePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoSubscribePageRoutingModule {}
