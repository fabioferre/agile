import { CategoriasService } from './../categorias.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.scss'],
})
export class NovoComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [''],
        category_id: [''],
        weight: [''],
        cost_price: [''],
        sale_price: [''],
        units: [0],
        code: [''],
        description: [''],
        sale: [true],
        stock: [true],
        brand: [''],
        minimum_units:[1]
    });
    public categories: any;
    constructor(
        private fb: FormBuilder,
        private categoriasService :CategoriasService,
        public productService: ProdutoService,
        private helper: HelperService,
        private router: Router
    ) { }

    ngOnInit() { 
        this.getCategories();
        // this.form.controls.sale.setValue(true);
        // this.form.controls.stock.setValue(true);
    }

    alter(control): void {
        if(this.form.controls[control].enabled)
        {
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
        
        if(this.form.valid) {
            this.helper.load();
            this.productService.create(this.form.value)
            .subscribe((product)=> {
                this.helper.message('produto cadastrado')
                this.productService.products.push(product)
                this.router.navigate(['/produtos']);
            }, error => this.helper.message(error) );
        } else {
            
        }
    }
}
