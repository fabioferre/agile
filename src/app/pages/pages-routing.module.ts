import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { AuthService } from '../service/auth.service';

const routes: Routes = [
    {
        path: '',
        component: PagesPage,
        children: [
            { path: '', redirectTo: 'home', canActivate: [AuthService], pathMatch: 'full' },
            { path: 'home', canActivate: [AuthService], loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule) },
            { path: 'pedidos', canActivate: [AuthService], loadChildren: () => import('../pages/pedidos/pedidos.module').then(m => m.PedidosPageModule) },
            { path: 'auth', loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthPageModule) },
            { path: 'produtos', canActivate: [AuthService], loadChildren: () => import('../pages/produtos/produtos.module').then(m => m.ProdutosPageModule) },
            { path: 'mesas', canActivate: [AuthService], loadChildren: () => import('../pages/mesas/mesas.module').then(m => m.MesasPageModule) },


            { path: 'motoboy', canActivate: [AuthService], loadChildren: () => import('../pages/motoboy/motoboy.module').then(m => m.MotoboyPageModule) },
            { path: 'funcionarios', canActivate: [AuthService], loadChildren: () => import('../pages/funcionarios/funcionarios.module').then(m => m.FuncionariosPageModule) },
            { path: 'lojas', canActivate: [AuthService], loadChildren: () => import('../pages/lojas/lojas.module').then(m => m.LojasPageModule) },
            { path: 'clientes', canActivate: [AuthService], loadChildren: () => import('../pages/clientes/clientes.module').then(m => m.ClientesPageModule) },
            { path: 'sistema', canActivate: [AuthService], loadChildren: () => import('../pages/sistema/sistema.module').then(m => m.SistemaPageModule) },
            { path: 'fretes', canActivate: [AuthService], loadChildren: () => import('../pages/fretes/fretes.module').then(m => m.FretesPageModule) },
            { path: 'account', loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesPageRoutingModule { }
