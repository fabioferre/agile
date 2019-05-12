import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', canActivate: [AuthService], pathMatch: 'full' },
  { path: 'home', canActivate: [AuthService], loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'pedidos', canActivate: [AuthService], loadChildren: './pages/pedidos/pedidos.module#PedidosPageModule' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'produtos', loadChildren: './pages/produtos/produtos.module#ProdutosPageModule' },
  { path: 'categorias', loadChildren: './pages/categoria/categoria.module#CategoriaPageModule' },
  { path: 'mesas', loadChildren: './pages/mesas/mesas.module#MesasPageModule' },
  { path: 'motoboy', loadChildren: './pages/motoboy/motoboy.module#MotoboyPageModule' },
  { path: 'funcionarios', loadChildren: './pages/funcionarios/funcionarios.module#FuncionariosPageModule' },
  { path: 'lojas', loadChildren: './pages/lojas/lojas.module#LojasPageModule' },
  { path: 'clientes', loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },  { path: 'bairros', loadChildren: './pages/bairros/bairros.module#BairrosPageModule' },
  { path: 'sistema', loadChildren: './pages/sistema/sistema.module#SistemaPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
