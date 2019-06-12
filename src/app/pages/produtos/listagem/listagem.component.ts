import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Controller } from '../../../service/controller';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent  extends Controller implements OnInit {
    public displayedColumns = ['id', 'image', 'name', 'brand', 'category', 'unity', 'action'];
    // public dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public productService: ProdutoService,
        private router: Router,
        private alertCtrl: AlertController ) { super()}

    ngOnInit() {
        this.dataSource.sort = this.sort;
    
        if (!this.productService.products) {
            this.productService.get().subscribe(products => {
                this.productService.products = products;
                this.dataSource.data = products;
                this.dataSource._updateChangeSubscription();
              
            });
        } else {
            this.dataSource.data = this.productService.products;
            this.dataSource._updateChangeSubscription();
        }
    }

    public edit(product): void {
        this.productService.activeNE( product );
        this.router.navigate(['/produtos/editar', product.id]);
    }


    async delete(product) {
        const alert = await this.alertCtrl.create({
            header: 'Tem certeza?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {

                    }
                },
                {
                    text: 'Deletar',
                    cssClass: 'danger',
                    handler: () => {
                       
                        this.productService.deleteById(product.id).subscribe(response => {
                            // this.productService.products
                            // .slice( this.productService.products.indexOf(product), 1);
                            console.log(this.productService.products.indexOf(product));
                            this.dataSource.data = this.productService.products;
                            this.dataSource._updateChangeSubscription();
                        });
                        
                    }
                }
            ]
        })

        return await alert.present();
    }

}

