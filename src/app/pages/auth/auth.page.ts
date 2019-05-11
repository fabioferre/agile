import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
    animations: [
        trigger('auth', [
            state('no', style({

            })),
            state('yes', style({

            })),
            transition('* => *', [
                animate('1s')
            ]),
        ])
    ]
})
export class AuthPage implements OnInit {
    public background = './assets/bg.jpeg';
    public auth = 1;
    constructor() { }

    ngOnInit() {
    }

    public changeScreen(event): void {
        this.auth = event;
    }

}
