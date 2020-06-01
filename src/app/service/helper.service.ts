import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorModalComponent } from '../layout/error-modal/error-modal.component';
@Injectable({
    providedIn: 'root'
})
export class HelperService {
    private apiURL = environment.host;
    // private apiURL = 'http://18.228.52.166/api';
    public today: string;
    public hours: string;
    public format: string;
    public order: any;
    public isLoading: boolean;
    public nextDay: Date;
    constructor(
        private toastCtrl: ToastController,
        private modalCtrl: ModalController,
        private platform: Platform,
        public dialog: MatDialog
    ) { }


    get isMobile() {
        return this.platform.is('mobile');
    }

    get url() {
        return this.apiURL;
    }

    modalError(errorEvent, style= 'danger'): MatDialogRef<ErrorModalComponent>  {
        const modal = this.dialog.open(ErrorModalComponent, {
            minHeight: '100px',
            width: '350px',
            panelClass: 'custom-dialog',
            data: {errorEvent: errorEvent, style: style}
        });

        return modal;
    }
    message(message?, style?) {
        if (message.error) {
            for (const i in message.error.errors) {
                if (i) {
                    this.toast('Atenção: ' + message.error.errors[i], { color: 'danger' });
                }
            }
        } else {
            this.toast(message, { color: style });
        }
    }

    async toast(messageToShow, options: any = {}) {

        if(this.isMobile) {
            options.position = 'bottom';
        }
        const toast = await this.toastCtrl.create(
            {
                message: messageToShow,
                position: 'bottom',
                color: options.color ? options.color : 'success',
                duration: 3000,
            });

        toast.present();

    }

    async load(status?) {
        if (status === false) {
           return  this.isLoading = await false;
        } else {
            this.isLoading = await true;
            setTimeout(this.loadDismiss, 90000);

        }

    }

    async  loadDismiss() {
        this.isLoading = await false;
        // await this.loading.dismiss();
    }

    async modalDismiss(status?, then?) {
        if (status) {
            return await this.modalCtrl.dismiss(status);
        } else if (then) {
            this.modalCtrl.dismiss().then(() => {
                console.log(then);
            });
        }
        return await this.modalCtrl.dismiss();

    }

    formatDate(options: any) {
        const date = new Date();
        let year: any = date.getFullYear();
        let month: any = (1 + date.getMonth()).toString().padStart(2, '0');
        let day: any = options.day ? options.day : date.getDate().toString().padStart(2, '0');
        if (options.add) {
            const more = options.add.split(' ');
            switch (more[1]) {
                case 'month':
                    if (month === 12) {
                        month = 1;
                    } else {
                        month = Number(month) + Number(more[0]);
                    }

                    month = (month < 10 ? '0' : '') + month;

                    break;

                case 'day':
                    if (day === 31) {
                        month = 1;
                    } else {
                        month = Number(month) + Number(more[0]);
                    }
                    day = Number(day) + Number(more[0]);
                    day = (day < 10 ? '0' : '') + day;
                    break;

                case 'year':
                    year = Number(year) + Number(more[0]);
                    year = (year < 10 ? '0' : '') + year;
                    break;
            }

        }

        return `${year}-${month}-${day}`;

    }

    date() {
        return this;
    }

    momentDate(date: any = new Date()) {
        return moment(date)
        .parseZone()
        .locale(window.navigator.language);
    }



}
