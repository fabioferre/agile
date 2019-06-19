import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HelperService } from 'src/app/service/helper.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

    constructor(
        public auth: AuthService, 
        public helper: HelperService
    ) { }
    ngOnInit() {
        this.getUser();
    }

    async getUser() {
        await this.auth.canActivate()
        return await this.auth.user
    }



}
