import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
    displayedColumns: string[] = ['id', 'image', 'name', 'category', 'unity', 'action'];
    dataSource = new MatTableDataSource<any>(this.productService.products);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private productService: ProdutoService, private router: Router) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public delete(): void {

    }

    public edit(product): void {
        this.productService.productToEdit = product;
        this.router.navigate(['/produtos/editar']);
    }

    get produtc() {
        return this.productService;
    }

}

