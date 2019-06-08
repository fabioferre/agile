import { FretesService } from './../fretes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-fretes',
  templateUrl: './editar-fretes.component.html',
  styleUrls: ['./editar-fretes.component.scss'],
})
export class EditarFretesComponent implements OnInit {
  public frete = this.fretesService.freteToEdit;

  public form: FormGroup = this.fb.group({
    neighborhood: ['', Validators.required],
    freight: [0, Validators.required],

});

constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private fretesService: FretesService
) { }

ngOnInit() {
    if (this.fretesService.freteToEdit) {
        this.form.patchValue(this.fretesService.freteToEdit);
    } else {
        this.router.navigate(['fretes']);
    }
}

public save(): void {
    this.fretesService.updateById(this.fretesService.freteToEdit.id, this.form.value)
        .subscribe(response => {
            if (response) {
                let idx = this.fretesService.fretes.indexOf(this.fretesService.freteToEdit);
                this.fretesService.fretes[idx] = this.form.value;
                this.router.navigate(['/fretes']);

            }

        })
}

}
