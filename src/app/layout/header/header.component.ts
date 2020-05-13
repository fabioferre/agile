import { HelperService } from 'src/app/service/helper.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public helper: HelperService,
    public auth: AuthService
    ) { }

  ngOnInit() {}

  public useMyStore() {
    this.auth.user.using_another_store = false;
    this.auth.user.another_store = null;
    this.auth.user.store_id =   this.auth.store.id;
    this.auth.storage.set('user', this.auth.user);
    setTimeout(() => {
        location.reload();
    }, 500);
  }
}
