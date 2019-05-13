import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from '../produtos/produto.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private auth: AuthService, public productService: ProdutoService,
        private helper: HelperService) { }

    ngOnInit() {

        if (!this.productService.products) {
            this.productService.get().subscribe(products => {
                this.productService.products = products;
                this.helper.load(false);
            });
        }
    }

}
