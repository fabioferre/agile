import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from '../produtos/produto.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private auth: AuthService, public productService: ProdutoService) { }

    ngOnInit() {

        if (!this.productService.products) {
            this.productService.get().subscribe(products => {
                this.productService.products = products;
            });
        }
    }

}
