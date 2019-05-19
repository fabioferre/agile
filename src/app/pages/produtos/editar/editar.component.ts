import { CategoriasService } from './../categorias.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

    private product = this.productService.productToEdit;
    public form: FormGroup = this.form = this.fb.group({
        name: [this.product.name, [Validators.required, Validators.minLength(2)]],
        number: [this.product.number],
        category_id: [this.product.category ? this.product.category.id : ''],
        weight: [this.product.weight],
        weight_type: [this.product.weight_type],
        cost_price: [this.product.cost_price],
        sale_price: [this.product.sale_price],
        units: [this.product.units],
        code: [this.product.code],
        description: [this.product.description],
        sale: [this.product.sale],
        stock: [this.product.stock],
        id: [this.product.id],
        brand: [this.product.brand],
        minimum_units: [this.product.minimum_units]
    });

    public categories: any;
    constructor(
        private fb: FormBuilder,
        private productService: ProdutoService,
        private helper: HelperService,
        private router: Router,
        public categoriasService: CategoriasService
    ) { }

    ngOnInit() {
        this.getCategories();
        if (!this.product) {
            this.router.navigate(['/produtos'])
        }


    }

    // alter(control): void {
    //     if (this.form.controls[control].enabled) {
    //         this.form.controls[control].disable()
    //         this.form.controls[control].setValue('')
    //     } else {
    //         this.form.controls[control].enable()
    //     }
    // }

    getCategories() {
        return this.categoriasService.get().subscribe(categories => {
            this.categories = categories;

        })
    }

    public submit(): void {

        if (this.form.valid) {
            this.helper.load();
            this.productService.updateById(this.form.value.id, this.form.value)
                .subscribe((product) => {
                    console.log(this.form.value)
                    const idx = this.productService.products.indexOf(this.product);
                    this.productService.products[idx] = product;
                    this.helper.load();
                    this.helper.message('Edição efetuada ')
                    this.router.navigate(['/produtos']);
                   
                }, error => this.helper.message(error));
        } else {

        }
    }


}
