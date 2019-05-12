import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../categoria/categoria.service';
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
        name: [ this.product.name, [Validators.required, Validators.minLength(2)]],
        number: [ this.product.number],
        category_id: [ this.product.category.id],
        weight: [ this.product.weight],
        cost_price: [ this.product.cost_price],
        sale_price: [ this.product.sale_price],
        units: [ this.product.units],
        code: [ this.product.code],
        description: [ this.product.description],
        sale: [ this.product.sale],
        stock: [ this.product.stock]
    });

    public categories: any;
    constructor(
        private fb: FormBuilder,
        private categoryService: CategoriaService,
        private productService: ProdutoService,
        private helper: HelperService,
        private router: Router
    ) { }

    ngOnInit() { 
        if( !this.product) {
            this.router.navigate(['/produtos'])
        } 

        console.log(this.product)
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


}
