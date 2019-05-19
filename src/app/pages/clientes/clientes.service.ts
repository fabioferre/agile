import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import Model from 'src/app/service/model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends Model {
  protected url = 'client/partner';
  constructor(protected http: HttpClient, protected helper: HelperService) { super(http, helper) }
}
