import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { LojasService } from '../lojas.service';

@Component({
  selector: 'app-nova-loja',
  templateUrl: './nova-loja.component.html',
  styleUrls: ['./nova-loja.component.scss'],
})
export class NovaLojaComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cellphone: [''],
    phone: [''],
    address_street: [''],
    address_number: [''],
    address_zipcode: [''],
    address_city: [""],
    address_complement: [''],
    address_neighborhood: [''],
    address_state: [""]
});


  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public lojasService: LojasService) { }



  ngOnInit() {}

  public submit(): void {
    if (this.form.valid) {
      this.lojasService.create(this.form.value)
        .subscribe(( lojas) => {
          this.helper.toast('loja cadastrada !')
          this.lojasService.lojas.push(lojas)
          this.router.navigate(['/lojas']);
        });
    }
  }
}
