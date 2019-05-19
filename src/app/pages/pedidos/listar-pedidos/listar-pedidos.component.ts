import { PedidosService } from './../pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent implements OnInit {
    public displayedColumns: string[] = ['status','created_at', 'id', 'type', 'total', 'action'];
    public dataSource = new MatTableDataSource<any>(this.pedidosService.pedidos);
    @ViewChild(MatSort) sort: MatSort;

    public typeSelling = {
        type1: 'Balcão',
        type2: 'Entrega',
        type3: 'Cliente',
        type4: 'Mesa'
    };

    constructor(
        private pedidosService: PedidosService,
        private router: Router) { }

    ngOnInit() {
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public delete(): void {
        ''
    }

    public edit(req): void {

        this.router.navigate(['/motoboy/editar']);
    }



}
