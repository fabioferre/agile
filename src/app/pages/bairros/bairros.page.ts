import { BairrosService } from './bairros.service';
import { HelperService } from './../../service/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bairros',
  templateUrl: './bairros.page.html',
  styleUrls: ['./bairros.page.scss'],
})
export class BairrosPage implements OnInit {

  constructor(
    public bairrosService: BairrosService,
    public helper: HelperService) { }

  ngOnInit(  ) {
    
       
   }

}
