import { Component, OnInit, Inject } from '@angular/core';
import { ModalFluxoComponent } from 'src/app/pages/produtos/modal-fluxo/modal-fluxo.component';
import { HttpErrorResponse } from '@angular/common/http';
import { isObject, isArray, isString } from 'util';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HelperService } from 'src/app/service/helper.service';
@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
    public errors: string[] = [];
    constructor(
        public dialogRef: MatDialogRef<ModalFluxoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
        if(this.data.errorEvent.error) {
            if (this.data.errorEvent.error.errors) {
                let errors = this.data.errorEvent.error.errors;
                if (isObject(errors)) {
                    for (let i in errors) {
                        this.errors.push(errors[i]);
                    }
                } else if(isArray(errors)) {
                    for(let i of errors) {
                        this.errors.push(i);
                    }
                } else if(isString(errors)) {
                    this.errors.push(errors);
                }

            } else if(isObject(this.data.errorEvent.error)) {
                for (let i in this.data.errorEvent.error) {
                    this.errors.push(this.data.errorEvent.error[i]);
                }
            } else if(isString(this.data.errorEvent.error)) {
                this.errors.push(this.data.errorEvent.error);
            } else if(isArray(this.data.errorEvent.error)) {
                this.errors = this.errors.concat(this.data.errorEvent.error);
            }

            
        } else if(isString(this.data.errorEvent)) {
            this.errors.push(this.data.errorEvent)
        } else if(Array.isArray(this.data.errorEvent))
        {
            this.errors = this.errors.concat(this.data.errorEvent);
        }

        console.log(this.data)
    }

}
