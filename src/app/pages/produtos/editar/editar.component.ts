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
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [''],
        category_id: [''],
        weight: [''],
        cost_price: [''],
        sale_price: [''],
        units: [''],
        code: [''],
        description: [''],
        sale: [true],
        stock: [true]
    });
    public categories: any;
    constructor(
        private fb: FormBuilder,
        private categoryService: CategoriaService,
        private productService: ProdutoService,
        private helper: HelperService,
        private router: Router
    ) { }

    ngOnInit() { }

}
