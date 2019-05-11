import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  @Output() public typeAuth: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

  public change(screen): void {
    this.typeAuth.emit(screen);
  }
}
