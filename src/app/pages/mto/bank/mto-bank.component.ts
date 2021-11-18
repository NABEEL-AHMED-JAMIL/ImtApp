import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

export interface MtoPartnerBank {
  bankId?: number;
  bankName?: string;
  bankImageurl?: string;
  bankEnabled?: string;
  countryCode?: string;
  countryEnabled?: string;
  countryImageUrl?: string;
  countryName?: string;
  partnerId?: number;
  partnerImageUrl?: string;
  partnerName?: string;
}

@Component({
  selector: 'app-mto-bank',
  templateUrl: 'mto-bank.component.html',
  styleUrls: ['mto-bank.component.scss'],
})
export class MtoBankComponent {

  public searchFilter: any = '';
  public partnerId: any;
  public countryImageUrl: string;
  public partnerImageUrl: string;
  public countryCode: string;
  public bankList :Array<MtoPartnerBank>;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.countryCode = params.get('countryCode');
        this.imrhService.findMtoBankByMtoPartnerIdAndMtoCountryCode(this.partnerId, this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.bankList = response.data;
              if (this.bankList.length > 0) {
                this.countryImageUrl = this.bankList[0].countryImageUrl;
                this.partnerImageUrl = this.bankList[0].partnerImageUrl;
              }
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
    });
  }

  public deleteMtoBankLinkMtoPartner(index: any, payload: MtoPartnerBank): void {
    this.alertController.create({
      header: 'Delete Partner Bank',
      subHeader: 'Are you sure to delte partner bank?',
      message: 'Enter the bank name to delete the partner bank.',
      inputs: [
        {
          name: 'bankName',
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
            if (payload.bankName == data.bankName) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteMtoBankLinkMtoPartner(payload.partnerId, payload.bankId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.bankList.splice(index, 1);
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

  public attachMtoBankWithMtoPartner(): void {
    this.router.navigate(['/app-add-mto-bank'], { 
      queryParams: {
        partnerId: this.partnerId,
        countryCode: this.countryCode
      }
    });    
  }

}