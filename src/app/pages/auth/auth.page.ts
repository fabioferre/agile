import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
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
