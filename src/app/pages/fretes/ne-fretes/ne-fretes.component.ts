import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { FretesService } from '../fretes.service';

@Component({
  selector: 'app-ne-fretes',
  templateUrl: './ne-fretes.component.html',
  styleUrls: ['./ne-fretes.component.scss'],
})
export class NeFretesComponent implements OnInit {
  public frete = this.fretesService.freteToEdit;

  public form: FormGroup = this.fb.group({
    neighborhood: ['', Validators.required],
    freight: [0, Validators.required],

  });

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public fretesService: FretesService
  ) { }

  ngOnInit() {
    this.fretesService.checkNE();
    if(this.fretesService.elementToedit){
      this.form.patchValue(this.fretesService.elementToedit);
    }
   
  }


  public save() {
    this.fretesService.create(this.form.value)
      .subscribe((frete) => {
        if (frete) {
          this.helper.toast('Frete cadastrado')
          this.fretesService.fretes.push(frete)
          this.router.navigate(['/fretes']);
        }
      }, error => this.helper.message(error));

  }

  public update() {
    this.fretesService.updateById(this.fretesService.elementToedit.id, this.form.value)
      .subscribe((frete) => {
        if (frete) {
          const idx = this.fretesService.fretes.indexOf(this.fretesService.elementToedit);
          this.fretesService.fretes[idx] =frete;
          this.helper.toast('Edição efetuada com exito')
          this.router.navigate(['/fretes']);
        }
      });
  }

  ngOnDestroy(): void {
    this.fretesService.elementToedit = null;
    this.fretesService.ne = false;
}

}
