import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalFluxoComponent } from 'src/app/pages/produtos/modal-fluxo/modal-fluxo.component';
import { HttpErrorResponse } from '@angular/common/http';
import { isObject, isArray, isString } from 'util';


@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
    public errors: string[] = [];
    constructor(
        public dialogRef: MatDialogRef<ModalFluxoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
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

            }
        } else if(isString(this.data.errorEvent)) {
            this.errors.push(this.data.errorEvent)
        }
    }

}
