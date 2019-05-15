import { LojasService } from './lojas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.page.html',
  styleUrls: ['./lojas.page.scss'],
})
export class LojasPage implements OnInit {

  constructor(public lojasService: LojasService) { }

  ngOnInit(  ) {
    if(!this.lojasService.lojas) {
        this.lojasService.get().subscribe(lojas => {
            this.lojasService.lojas = lojas;
         
        })
    }
}

}
