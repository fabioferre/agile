import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() public auth: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

  public change(screen): void {
    this.auth.emit(screen);
  }
}
