import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class LojasService extends Model {
  public lojas;
  public lojaEdit;
  protected url = 'stores'
  constructor(http :HttpClient , helper : HelperService) { super(http, helper)}
}
