import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Partner } from '../../../model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-mto-partner',
  templateUrl: 'mto-partner.component.html',
  styleUrls: ['mto-partner.component.scss'],
})
export class MtoPartnerComponent {

  public partnerList :Array<Partner>;

  constructor(private menu: MenuController,
    private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.menu.close();
    this.fetchAllMtoPartner();
  }

  public fetchAllMtoPartner(): void {
    this.loaderService.showLoader().then(()=>{
      this.imrhService.fetchAllMtoPartner()
      .pipe(first()).subscribe(
        response => {
          if (response.status === 'SUCCESSFUL') {
            this.partnerList = response.data;
          } else {
            this.toastService.presentToast(response.message);
          }
          this.loaderService.hideLoader();
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

  public onRenderItems(event: any): void {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    this.moveItemInArray(event.detail.from, event.detail.to);
    event.detail.complete();
  }
  
  public moveItemInArray(old_index: number, new_index: number): void {
    let diff = new_index - old_index;
    let toUpdate: Array<Partner> = new Array();
    if (new_index >= this.partnerList.length) {
      var k = new_index - this.partnerList.length + 1;
      while (k--) {
        this.partnerList.push(undefined);
      }
    }
    this.partnerList.splice(new_index, 0, this.partnerList.splice(old_index, 1)[0]);
    if (diff > 0) {
      this.partnerList[new_index].preferenceOrder = new_index + 1;
      toUpdate.push(this.partnerList[new_index]);
      for (let i = new_index - 1; i >= old_index; i--) {
        this.partnerList[i].preferenceOrder = i + 1;
        toUpdate.push(this.partnerList[i]);
      }
    } else if (diff < 0) {
      this.partnerList[new_index].preferenceOrder = new_index + 1;
      toUpdate.push(this.partnerList[new_index]);
      for (let i = new_index + 1; i <= old_index; i++) {
        this.partnerList[i].preferenceOrder = i + 1;
        toUpdate.push(this.partnerList[i]);
      }
    }
    this.updatePreferenceOrderForMtoPartner(toUpdate);
  }
  
  public updatePreferenceOrderForMtoPartner(toUpdate: Array<Partner>): void {
    this.loaderService.showLoader().then(()=>{
      this.imrhService.updatePreferenceOrderForMtoPartner(toUpdate)
      .subscribe(response => {
        if (response.status === 'SUCCESS') {
          this.partnerList = response.data
        }
        this.toastService.presentToast(response.message);
        this.loaderService.hideLoader();
      }, error => {
        this.loaderService.hideLoader();
        this.toastService.presentToast(error.error);
      });
    });
  }

  public viewPartner(payload: Partner): void {
    this.router.navigate(['/app-view-mto-partner'], { 
      queryParams: { 
        partnerId: payload.partnerId
      }
    });
  }

  public editPartner(payload: Partner): void {
    this.router.navigate(['/app-edit-mto-partner'], { 
      queryParams: { 
        partnerId: payload.partnerId
      }
    });
  }

  public deletePartner(index: any, payload: Partner): void {
    this.alertController.create({
      header: 'Delete Partner',
      subHeader: 'Are you sure to delte partner?',
      message: 'Enter the partner name to delete the partner.',
      inputs: [
        {
          name: 'partnerName',
          placeholder: 'Eg.XYZ',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            if (payload.partnerName == data.partnerName) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteMtoPartner(payload)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.partnerList.splice(index, 1);
                  }
                  this.toastService.presentToast(response.message);
                  this.loaderService.hideLoader();
                },
                  error => {
                    this.loaderService.hideLoader();
                    this.toastService.presentToast(error.error);
                });
              });
            } else {
              this.toastService.presentToast('Code not match');
            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  

}