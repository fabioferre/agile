import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HelperService } from 'src/app/service/helper.service';

import * as $ from 'jquery';
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
        $('.navigation').find('a').click(function() {
            $('.navigation-trigger').hasClass('toggled') ? $(this).removeClass('toggled') : $(this).addClass('toggled');
        });
    }

    async getUser() {
        await this.auth.canActivate();
        return await this.auth.user;
    }



}
