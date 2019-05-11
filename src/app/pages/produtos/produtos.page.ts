import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../categoria/categoria.service';
@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.page.html',
    styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
    public categories: any;
    constructor(private categoryService: CategoriaService ) { }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        return this.categoryService.get().subscribe(categories => {
            console.log(categories);
            this.categories = categories;
        })
    }
}
