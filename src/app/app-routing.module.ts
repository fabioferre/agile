import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', canActivate: [AuthService], pathMatch: 'full' },
  { path: 'home', canActivate: [AuthService], loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'pedidos', canActivate: [AuthService], loadChildren: './pages/pedidos/pedidos.module#PedidosPageModule' },
  { path: 'auth', canActivate: [AuthService], loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'produtos', canActivate: [AuthService], loadChildren: './pages/produtos/produtos.module#ProdutosPageModule' },
  { path: 'mesas', canActivate: [AuthService], loadChildren: './pages/mesas/mesas.module#MesasPageModule' },
  { path: 'motoboy', canActivate: [AuthService], loadChildren: './pages/motoboy/motoboy.module#MotoboyPageModule' },
  { path: 'funcionarios', canActivate: [AuthService], loadChildren: './pages/funcionarios/funcionarios.module#FuncionariosPageModule' },
  { path: 'lojas', canActivate: [AuthService], loadChildren: './pages/lojas/lojas.module#LojasPageModule' },
  { path: 'clientes', canActivate: [AuthService], loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },
  { path: 'bairros', canActivate: [AuthService], loadChildren: './pages/bairros/bairros.module#BairrosPageModule' },
  { path: 'sistema', canActivate: [AuthService], loadChildren: './pages/sistema/sistema.module#SistemaPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
