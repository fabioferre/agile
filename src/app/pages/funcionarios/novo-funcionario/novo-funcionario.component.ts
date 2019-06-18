import { LojasService } from './../../lojas/lojas.service';
import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { SistemaService } from '../../sistema/sistema.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss'],
})
export class NovoFuncionarioComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(6)]],
    occupation: [''],
    store_id: ['',Validators.required],
    cellphone: [''],
    phone: [''],
    address_street: [''],
    address_number: [''],
    address_zipcode: [''],
    address_city: [""],
    address_complement: [''],
    address_neighborhood: [''],
    address_state: [""],
    role_id: ["",Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(14)]],
});


  constructor(
    public sistemaService:SistemaService,
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public funcionariosService: FuncionariosService,
    public lojasService: LojasService) { }

  ngOnInit() {
    if (!this.lojasService.lojas) {
      this.lojasService.get().subscribe((lojas) => {
        this.lojasService.lojas = lojas;
      });
    }
  }
 
  public submit(): void {
    if (this.form.valid) {
      this.funcionariosService.create(this.form.value)
        .subscribe(( funcionarios) => {
          if(funcionarios){
            this.helper.message('Funcionarios cadastrado !')
            this.funcionariosService.funcionarios.push(funcionarios)
            this.router.navigate(['/funcionarios']);
          }

        });
    }
  }

}
