import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cpf: [''],
    cellphone: [''],
    phone: [''],
    address_street: [''],
    address_zipcode: [''],
    address_city: [''],
    address_state: [''],
    address_complement: [1],
    reference_point: [''],
    address_neighborhood: [''],
    address_number: [null],
    category: [1]
  });

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  public submit(): void {
 
  }
}
