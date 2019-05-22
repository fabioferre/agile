import { HelperService } from './../../service/helper.service';
import { Component, OnInit } from '@angular/core';
import { MotoboyService } from './motoboy.service';


@Component({
  selector: 'app-motoboy',
  templateUrl: './motoboy.page.html',
  styleUrls: ['./motoboy.page.scss'],
})
export class MotoboyPage implements OnInit {

  constructor(public motoboyService : MotoboyService,
              public helper :HelperService) { }

  ngOnInit() {
    if (!this.motoboyService.motoboy) {
      this.helper.load();
      this.motoboyService.get().subscribe(motoboy => {
          this.motoboyService.motoboy = motoboy;
          console.log(motoboy)
      });
  }
  }

}
