import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', canActivate: [AuthService], pathMatch: 'full' },
  { path: 'home', canActivate: [AuthService], loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'pedidos', canActivate: [AuthService], loadChildren: './pages/pedidos/pedidos.module#PedidosPageModule' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'produtos', loadChildren: './pages/produtos/produtos.module#ProdutosPageModule' },
  { path: 'categoria', loadChildren: './pages/categoria/categoria.module#CategoriaPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
