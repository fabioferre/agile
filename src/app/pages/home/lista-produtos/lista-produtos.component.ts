import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
@Component({
    selector: 'app-lista-produtos',
    templateUrl: './lista-produtos.component.html',
    styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent implements OnInit {
    displayedColumns: string[] = ['id', 'image', 'name', 'category', 'unity', 'action'];
    dataSource = new MatTableDataSource<any>(this.productService.products);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private productService: ProdutoService) { }

    ngOnInit() {

    }

}
