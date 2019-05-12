import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ProdutoService } from '../../produtos/produto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
@Component({
    selector: 'app-lista-produtos',
    templateUrl: './lista-produtos.component.html',
    styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent implements OnInit {
    @Input() public products;
    displayedColumns: string[] = ['id', 'image', 'name', 'unity', 'sale_price', 'action'];
    dataSource: any;
    

    @ViewChild(MatSort) sort: MatSort;
    constructor(private productService: ProdutoService, private router: Router) { }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<any>(this.products);
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
