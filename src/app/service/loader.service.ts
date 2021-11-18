import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    constructor(private loadingController: LoadingController) { }

    public async showLoader() {
        const loading = await this.loadingController.create({
            message: 'Please Wait...',
        });
        return loading.present();
    }

    public hideLoader() {
        this.loadingController.dismiss();
    }
}