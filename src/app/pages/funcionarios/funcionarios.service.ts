import { Injectable } from '@angular/core';
import { HelperService } from '../../service/helper.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient, private helper: HelperService) { }
}
