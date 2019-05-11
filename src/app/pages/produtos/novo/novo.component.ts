import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.scss'],
})
export class NovoComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [''],
        category_id: [''],
        weight: [''],
        cost_price: [''],
        sale_price: [''],
        units: [''],
        code: [''],
        description: ['']
    });
    categories: any[] = [
        { id: 'steak-0', name: 'Steak' },
        { id: 'pizza-1', name: 'Pizza' },
        { id: 'tacos-2', name: 'Tacos' }
    ];
    constructor(private fb: FormBuilder) { }

    ngOnInit() { }

    alter(control): void {
        if(this.form.controls[control].enabled)
        {
            this.form.controls[control].disable()
            this.form.controls[control].setValue('')
        } else {
            this.form.controls[control].enable()
        }
    }
    public submit(): void {
        console.log(this.form);
    }
}
