import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() public typeAuth: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

  public change(screen): void {
    this.typeAuth.emit(screen);
  }
}
