import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';


@Injectable({
  providedIn: 'root'
})
export class MotoboyService extends Model {
  public motoboy;
  public motoboyEdit;
  protected url = 'motoboy';

  constructor( http: HttpClient, helper: HelperService) { super(http, helper)}
}
