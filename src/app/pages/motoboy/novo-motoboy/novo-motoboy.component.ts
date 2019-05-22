import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { MotoboyService } from '../motoboy.service';

@Component({
  selector: 'app-novo-motoboy',
  templateUrl: './novo-motoboy.component.html',
  styleUrls: ['./novo-motoboy.component.scss'],
})
export class NovoMotoboyComponent implements OnInit {

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
    address_state: [""],
    cpf: ['', [Validators.required, Validators.minLength(14)]],
});

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public motoboyService: MotoboyService) { }

  ngOnInit() {}

  public submit(): void {
    if (this.form.valid) {
      this.motoboyService.create(this.form.value)
        .subscribe((motoboy) => {
          this.helper.message('cliente cadastrado !')
          console.log(motoboy)
          this.motoboyService.motoboy.push(motoboy)
          this.router.navigate(['/motoboy']);
        }, erro =>{
          console.log(erro)
        });
    }
  }

}
