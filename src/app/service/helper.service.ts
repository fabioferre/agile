import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    private apiURL = 'http://tagmus.com.br/api';
    // private apiURL = 'http://18.228.52.166/api';
    public today: string;
    public hours: string;
    public format: string;
    constructor(
        private toastCtrl: ToastController,
        private loading: LoadingController,
        private modalCtrl: ModalController,
    ) { }


    get url() {
        return this.apiURL;
    }

    message(message?, style?) {
        if (style) {
            this.toast(style, "Atenção: " + message);
        } else {
            if (message.error) {
                for (let i in message.error.errors) {

                    this.toast("danger", "Atenção: " + message.error.errors[i]);
                }
            } else {
                this.toast("success", message);
            }

        }


    }

    async toast(status, message) {
        const toast = await this.toastCtrl.create(
            {
                message: message,
                position: "top",
                color: status,
                duration: 1000,
                showCloseButton: true
            });

        toast.present();

    }

    async load(status?) {
        if (status === false) {
            this.loading.dismiss();
        } else {
            let loading = await this.loading.create({
                message: "Processando..."
            });
            return await loading.present();
        }


    }

    async  loadDismiss() {

       await this.loading.dismiss();
    }

    async modalDismiss(status?, then?) {
        if (status) {
            return await this.modalCtrl.dismiss(status);
        } else if (then) {
            this.modalCtrl.dismiss().then(() => { then });
        }
        return await this.modalCtrl.dismiss();

    }

    date(data?, more?) {
        let date = new Date()
        let format;
        if (data) {
            format = new Date(data).toISOString();
            this.format = format.split("T")[0];
            let hours = date.getHours() + data;
            let min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            this.hours = hours + ":" + min;
        } else {
            format = new Date().toISOString();

            if (more) {
                let som = format.split("T")[0].split('-');
                more = more.split(" ")

                switch (more[1]) {
                    case "month":
                        som[1] = parseInt(som[1]) + parseInt(more[0])
                        som[1] = (som[1] < 10 ? '0' : '') + som[1];
                        break;

                    case "day":
                        som[2] = parseInt(som[2]) + parseInt(more[0])
                        som[2] = (som[2] < 10 ? '0' : '') + som[2];
                        break;

                    case 'year':
                        som[0] = parseInt(som[0]) + parseInt(more[0])
                        som[0] = (som[0] < 10 ? '0' : '') + som[0];
                        break;
                }
                return som[0] + "-" + som[1] + "-" + som[2];
            }
            let min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            this.hours = new Date().getHours() + ":" + min;
            return this.today = format.split("T")[0];


        }

        return this;
    }



}
