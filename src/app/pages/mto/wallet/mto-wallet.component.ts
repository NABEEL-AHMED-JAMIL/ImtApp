import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

export interface MtoPartnerWallet {
  walletId?: number;
  walletName?: string;
  walletImageUrl?:string;
  walletEnabled?: string;
  countryCode?: string;
  countryEnabled?: string;
  countryImageUrl?: string;
  countryName?: string;
  partnerId?: number;
  partnerImageUrl?: string;
  partnerName?: string;
}

@Component({
  selector: 'app-mto-wallet',
  templateUrl: 'mto-wallet.component.html',
  styleUrls: ['mto-wallet.component.scss'],
})
export class MtoWalletComponent {

  public searchFilter: any = '';
  public partnerId: any;
  public countryImageUrl: string;
  public partnerImageUrl: string;
  public countryCode: string;
  public walletList :Array<MtoPartnerWallet>;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.countryCode = params.get('countryCode');
        this.imrhService.findMtoWalletByMtoPartnerIdAndMtoCountryCode(this.partnerId, this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.walletList = response.data;
              if (this.walletList.length > 0) {
                this.countryImageUrl = this.walletList[0].countryImageUrl;
                this.partnerImageUrl = this.walletList[0].partnerImageUrl;
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


  public deleteMtoWalletLinkMtoPartner(index: any, payload: MtoPartnerWallet): void {
    this.alertController.create({
      header: 'Delete Partner Wallet',
      subHeader: 'Are you sure to delte partner wallet?',
      message: 'Enter the wallet name to delete the partner wallet.',
      inputs: [
        {
          name: 'walletName',
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
            if (payload.walletName == data.walletName) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteMtoWalletLinkMtoPartner(payload.partnerId, payload.walletId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.walletList.splice(index, 1);
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

  public attachMtoWalletWithMtoPartner(): void {
    this.router.navigate(['/app-add-mto-wallet'], { 
      queryParams: {
        partnerId: this.partnerId,
        countryCode: this.countryCode
      }
    });
  }

}