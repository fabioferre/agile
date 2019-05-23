import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { LojasService } from '../lojas.service';

@Component({
  selector: 'app-editar-loja',
  templateUrl: './editar-loja.component.html',
  styleUrls: ['./editar-loja.component.scss'],
})
export class EditarLojaComponent implements OnInit {
public loja = this.lojasService.lojaEdit;
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

    ngOnInit() {
      if (this.lojasService.lojaEdit) {
        this.form.patchValue(this.lojasService.lojaEdit)
      } else {
        this.router.navigate(['/lojas']);
      }
    }

  public submit(): void {
    if (this.form.valid) {
      this.lojasService.updateById(this.lojasService.lojaEdit.id, this.form.value)
        .subscribe((loja) => {
          const idx = this.lojasService.lojas.indexOf(this.loja);
          this.lojasService.lojas[idx] = loja;
          this.helper.message('Edição efetuada ')
          this.router.navigate(['/lojas']);

        }, error => this.helper.message(error));
    }

  }

}
