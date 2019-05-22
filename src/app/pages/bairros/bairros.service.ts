import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import Model from 'src/app/service/model';

@Injectable({
  providedIn: 'root'
})
export class BairrosService extends Model {
  public bairros: any;
  public bairroToEdit: any;
  protected url = 'neighborhoods'
  constructor(http :HttpClient , helper : HelperService) { super(http, helper)}


}
