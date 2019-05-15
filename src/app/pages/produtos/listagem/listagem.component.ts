import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
    displayedColumns: string[] = ['id', 'image', 'name', 'brand', 'category', 'unity', 'action'];
    dataSource = new MatTableDataSource<any>(this.productService.products);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private productService: ProdutoService,
        private router: Router,
        private alertCtrl: AlertController) { }

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

    public edit(product): void {
        this.productService.productToEdit = product;
        this.router.navigate(['/produtos/editar', product.id]);
    }

    get product() {
        return this.productService;
    }


    async delete(id) {
        const alert = await this.alertCtrl.create({
            header: "Deseja excluir ?",
            message: 'Esta ação vai remover este item',

            buttons: [
                {
                    text: "Sim",
                    handler: () => {
                        this.productService.deleteById(id).subscribe(product => {
                
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
            ]
        })

        return await alert.present();
    }

}

