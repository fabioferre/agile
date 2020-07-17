import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

const routes: Routes = [
 
  {
    path: '', loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'website',
    loadChildren: () => import('./website/website.module').then( m => m.WebsitePageModule)
  },
  



];







@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
