import { Injectable } from '@angular/core';
import { ToastController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

    constructor(private toastController : ToastController ) { }

    public async presentToast(payload: any) {
        const toast = await this.toastController.create({
            message: payload,
            duration: 2000,
        });
        toast.present();
    }
    
}