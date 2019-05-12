import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';


@Injectable({
  providedIn: 'root'
})
export class MotoboyService {

  constructor(private http: HttpClient, private helper: HelperService) { }
}
