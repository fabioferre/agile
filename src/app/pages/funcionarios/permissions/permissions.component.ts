import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  public funcionario = this. funcionariosService.funcionarioEdit;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: [''],

});
  constructor(
    private fb: FormBuilder,
    public funcionariosService: FuncionariosService,
    private helper: HelperService,
    private router: Router) { }

  ngOnInit() {
 
    if (!this.funcionario) {
        this.router.navigate(['/funcionarios'])
    } else {
        this.form.patchValue(this.funcionario);
    }
}

alter(control): void {
    if (this.form.controls[control].enabled) {
        this.form.controls[control].disable()
        this.form.controls[control].setValue('')
    } else {
        this.form.controls[control].enable()
    }
}

public submit(): void {
        
  this.funcionariosService.updateById(this.funcionario.id, this.form.value)
      .subscribe((funcionario) => {
          const idx = this.funcionariosService.funcionarios.indexOf(this.funcionario);
          this.funcionariosService.funcionarios[idx] = funcionario;
          this.helper.message('Edição efetuada com exito')
          
          this.router.navigate(['/funcionarios']);
      });
 
}

}
