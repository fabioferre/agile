import { SistemaService } from './../sistema.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
    public niveis = [
        { name: "nivel 1", id: 5 },
        { name: "nivel 2", id: 6 },
        { name: "nivel 3", id: 7 },
        { name: "nivel 4", id: 8 },
        { name: "nivel 5", id: 9 }]

    public formToSend: FormGroup = this.fb.group({
        nivel: [5, [Validators.required, Validators.minLength(2)]],
        permissions: [],
    })
    public form: FormGroup = this.fb.group({
        5: [''],
        6: [''],
        7: [''],
        8: [''],
        9: [''],
        10: [''],
        11: [''],
        12: [''],
        13: [''],
        14: [''],
        15: [''],
        16: [''],
        17: [''],
    });

    constructor(private fb: FormBuilder,
        private sistemaService: SistemaService,
        private helper: HelperService) { }

    ngOnInit() {
        this.getPermissions()
    }

    public submit(): void {
        let ids = [];
        for (let i in this.form.value) {
            if (this.form.value[i] == true) {
                ids.push(i)
            }
        }

        this.formToSend.controls.permissions.setValue(ids);

        this.sistemaService.updateRoles(this.formToSend.value.nivel, { permissions: this.formToSend.value.permissions }).subscribe(response => {
            this.helper.message("Alteração efetuada !")
        })

    }

    getPermissions() {
        this.sistemaService.getRole(this.formToSend.value.nivel).subscribe(permisions => {
            permisions.forEach(element => {
                this.form.value[element.permission_id] = true
                this.form.updateOn
            });
            this.helper.message("Permissões carregas!")
            console.log(this.form.value)

        })



    }

}
