import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
 
    displayedColumns: string[] = ['id', 'image', 'name', 'category', 'unity', 'action'];
    dataSource:MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private productService: ProdutoService) { }

    ngOnInit() {
        
        this.getProducts();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private getProducts(): void {
        if(!this.productService.products)
        {
            this.productService.get().subscribe(products => {
                this.buildTable(products);
            })
        } else {
            this.buildTable(this.productService.products);
        }
    }


    private buildTable(products): void {
        this.dataSource = new MatTableDataSource<any>(products)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productService.products = products;
    }
    public delete(): void {

    }

    get produtc() {
        return this.productService;
    }

}

