import { HomeService } from './home.service';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from '../produtos/produto.service';
import { HelperService } from 'src/app/service/helper.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    @Input() public selectedRemove: any;
    public products: any;
    constructor(
        private auth: AuthService, 
        public productService: ProdutoService,
        private helper: HelperService,
        private homeService: HomeService) { }

    ngOnInit() {
        
        this.productService.get({
            filter: [ 
                ["sale", "1"]
            ]
        }).subscribe(products => {
            this.products = products;
            this.products.map(product => {
                product.qtd = 1;
            })
            this.helper.load(false);
        });
       

        if(!this.homeService.productSelected) {
            this.homeService.productSelected = [];
        }
    }


    ngOnDestroy(): void {
        this.homeService.productSelected = [];
        this.homeService.selection.clear();
        
    }





   

}
