import { HelperService } from 'src/app/service/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public helper: HelperService) { }

  ngOnInit() {}

}
