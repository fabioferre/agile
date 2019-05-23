import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { LojasService } from '../../lojas/lojas.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.scss'],
})
export class EditarFuncionarioComponent implements OnInit {
  public funcionario = this.funcionariosService.funcionarioEdit;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    occupation: [''],
    store_id: [''],
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

  constructor(public funcionariosService: FuncionariosService,
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public lojasService: LojasService ) { }

  ngOnInit() {
    if (this.funcionariosService.funcionarioEdit) {
      this.form.patchValue(this.funcionariosService.funcionarioEdit)
      if (!this.lojasService.lojas) {
        this.lojasService.get().subscribe((lojas) => {
          this.lojasService.lojas = lojas;
        });
      }
    } else {
      this.router.navigate(['/funcionarios']);
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.funcionariosService.updateById(this.funcionariosService.funcionarioEdit.id, this.form.value)
        .subscribe((motoboy) => {
          const idx = this.funcionariosService.funcionarios.indexOf(this.funcionario);
          this.funcionariosService.funcionarios[idx] = motoboy;
          this.helper.message('Edição efetuada ')
          this.router.navigate(['/funcionarios']);

        }, error => this.helper.message(error));
    }

  }

}
