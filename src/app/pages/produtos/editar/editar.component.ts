import { CategoriasService } from './../categorias.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit, OnDestroy {

    private product = this.productService.productToEdit;
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [''],
        category_id: [''],
        weight: [''],
        weight_type: [''],
        cost_price: [''],
        sale_price: [''],
        units: [''],
        code: [''],
        description: [''],
        sale: [''],
        stock: [''],
        brand: [''],
        minimum_units:['']
    });
    public categories = this.categoriasService.categories;
    constructor(
        private fb: FormBuilder,
        public productService: ProdutoService,
        private helper: HelperService,
        private router: Router,
        public categoriasService: CategoriasService
    ) { }

    ngOnInit() {
 
        if (!this.product) {
            this.router.navigate(['/produtos'])
        } else {
            this.form.patchValue(this.product);
            
            
            if(!this.product.sale) {
                this.alter('cost_price')
                this.alter('sale_price')
            }
            if(!this.product.stock) {
                this.alter('units')
                this.alter('minimum_units')
            }
        }
    }

    alter(control): void {
        if (this.form.controls[control].enabled) {
            this.form.controls[control].disable()
            this.form.controls[control].setValue('')
        } else {
            this.form.controls[control].enable()
        }
    }

    getCategories() {
        return this.categoriasService.get().subscribe(categories => {
            this.categories = categories;

        })
    }

    public submit(): void {
        
        this.productService.updateById(this.product.id, this.form.value)
            .subscribe((product) => {
                const idx = this.productService.products.indexOf(this.product);
                this.productService.products[idx] = product;
                this.helper.message('Edição efetuada com exito')
                
                this.router.navigate(['/produtos']);
            });
       
    }

    ngOnDestroy(): void {
        this.productService.productToEdit = [];
    }


}
