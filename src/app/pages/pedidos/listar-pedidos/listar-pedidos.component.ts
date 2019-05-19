import { PedidosService } from './../pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-listar-pedidos',
    templateUrl: './listar-pedidos.component.html',
    styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent implements OnInit {
    public displayedColumns: string[] = ['status','created_at', 'id', 'type', 'total', 'action'];
    public dataSource: any;  
    @ViewChild(MatSort) sort: MatSort;

    public typeSelling = {
        type1: 'Balcão',
        type2: 'Entrega',
        type3: 'Cliente',
        type4: 'Mesa'
    };

    constructor(
        public pedidosService: PedidosService,
        private router: Router,
        private helper: HelperService ) { }

    ngOnInit() {
        
        let date = this.helper.date(null, "-1 day")
 
        this.pedidosService.get({
            filter: [
                ['created_at', '>=', date]
            ]
        }).subscribe(pedidos => {
            this.pedidosService.pedidos = pedidos;
            // console.log(pedidos);
            this.dataSource = new MatTableDataSource<any>(pedidos);
            this.dataSource.sort = this.sort;

        })
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
