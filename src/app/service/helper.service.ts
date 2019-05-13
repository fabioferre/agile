import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiURL = 'http://tagmus/api';
  constructor(
    private toastCtrl: ToastController,
    private loading: LoadingController,
    private modalCtrl: ModalController,
     ) { }


  get url() {
    return this.apiURL;
  }

  message(message?) {
    if (message.error) {
      for (let i in message.error.errors) {

        this.toast("danger", "Atenção: " + message.error.errors[i]);
      }
    } else {
      this.toast("success", message);
    }

  }

  async toast(status, message) {
    const toast = await this.toastCtrl.create(
      {
        message: message,
        position: "top",
        color: status,
        duration: 3000,
        showCloseButton: true
      });

    toast.present().then(() => this.loading.dismiss());

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

  async modalDismiss(status?, then?) {
    if (status) {
      return await this.modalCtrl.dismiss(status);
    } else if (then) {
      this.modalCtrl.dismiss().then(() => { then });
    }
    return await this.modalCtrl.dismiss();

  }

}
