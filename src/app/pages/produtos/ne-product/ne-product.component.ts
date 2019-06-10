import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HelperService } from 'src/app/service/helper.service';
import { CategoriasService } from '../categorias.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ne-product',
    templateUrl: './ne-product.component.html',
    styleUrls: ['./ne-product.component.scss'],
})
export class NeProductComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [''],
        category_id: [''],
        weight: [''],
        weight_type: [''],
        sale: [''],
        cost_price: [''],
        sale_price: [''],
        stock: [''],
        units: [''],
        minimum_units: [''],
        maximum_units: [''],
        code: [''],
        description: [''],
        brand: [''],
        
    });

    public editor = ClassicEditor;


    constructor(
        private fb: FormBuilder,
        private categoriasService :CategoriasService,
        public productService: ProdutoService,
        private helper: HelperService,
        private router: Router
    ) { }

    ngOnInit() { 
        if(this.productService.productToEdit) {
            this.form.patchValue(this.productService.productToEdit);
        }
    }

    get toStock() {
        return this.form.controls.stock.value;
    }

    get toSale() {
        return this.form.controls.sale.value;
    }

    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }


    public save() {
        this.productService.create(this.form.value)
        .subscribe((product)=> {
            this.helper.message('produto cadastrado')
            this.productService.products.push(product)
            this.router.navigate(['/produtos']);
        }, error => this.helper.message(error) );
    }

    public update() {
        
    }
}
