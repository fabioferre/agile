import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss'],
})
export class NovoFuncionarioComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: [''],
    category_id: [''],
    weight: [''],
    cost_price: [''],
    sale_price: [''],
    units: [1],
    code: [''],
    description: [''],
    sale: [true],
    stock: [true]
});

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router) { }

  ngOnInit() {}

}
