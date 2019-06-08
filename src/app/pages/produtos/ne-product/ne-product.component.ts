import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProdutoService } from '../produto.service';

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
  constructor(private fb: FormBuilder,  public productService: ProdutoService ) { }

  ngOnInit() {}

}
