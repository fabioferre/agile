import { HelperService } from './../../../service/helper.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output() public typeAuth: EventEmitter<number> = new EventEmitter<number>();
    public form: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        'system_name': 'agile'
    });

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private storage: Storage,
        private helper: HelperService
    ) { }

    ngOnInit() { }

    public change(screen): void {
        this.typeAuth.emit(screen);
    }

    public submit(): void {

        if (this.form.valid) {
            this.helper.load();
            this.auth.authenticate(this.form.value).subscribe(user => {
                if (user) {
                    this.helper.toast("Seja bem vindo !")


                    let store = {id: user.store_id};
                    this.storage.set('user', user);
                    this.storage.set('store', store);
                    this.auth.configSystem(user, store);
                    this.router.navigate(['/home']);
                }
                this.helper.loadDismiss();
            },
            error => {
                this.helper.loadDismiss();
                this.helper.message(error)
            });
        }
    }


}
