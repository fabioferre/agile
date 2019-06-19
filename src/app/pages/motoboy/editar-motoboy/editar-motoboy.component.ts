import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { MotoboyService } from '../motoboy.service';

@Component({
  selector: 'app-editar-motoboy',
  templateUrl: './editar-motoboy.component.html',
  styleUrls: ['./editar-motoboy.component.scss'],
})
export class EditarMotoboyComponent implements OnInit {
  public motoboy = this.motoboyService.motoboyEdit;
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

  ngOnInit() {
    if (this.motoboyService.motoboyEdit) {
      this.form.patchValue(this.motoboyService.motoboyEdit)
    } else {
      this.router.navigate(['/motoboy']);
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.motoboyService.updateById(this.motoboyService.motoboyEdit.id, this.form.value)
        .subscribe((motoboy) => {
          if(motoboy){
            const idx = this.motoboyService.motoboy.indexOf(this.motoboy);
            this.motoboyService.motoboy[idx] = motoboy;
            this.helper.message('Edição efetuada ')
            this.router.navigate(['/motoboy']);
          }

        });
    }

  }

}
