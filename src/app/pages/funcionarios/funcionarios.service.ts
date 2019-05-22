import { Injectable } from '@angular/core';
import { HelperService } from '../../service/helper.service';
import { HttpClient } from '@angular/common/http';
import Model from 'src/app/service/model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService extends Model {
public funcionarios;
protected url = 'employees';
  constructor(public http: HttpClient, public helper: HelperService) { super(http, helper)}
}
