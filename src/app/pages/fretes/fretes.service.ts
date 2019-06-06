import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import Model from 'src/app/service/model';

@Injectable({
  providedIn: 'root'
})
export class FretesService extends Model {

  public fretes;
  public freteToEdit;
  public freteToShow;
  protected url = 'freights';

  constructor(http: HttpClient, helper: HelperService) { super(http, helper) }
}
