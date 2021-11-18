import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from '../../../model/country';
import { Wallet } from '../../../model/wallet';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';


@Component({
  selector: 'app-global-wallet',
  templateUrl: 'global-wallet.component.html',
  styleUrls: ['global-wallet.component.scss'],
})
export class GlobalWalletComponent {

  public searchFilter: any = '';
  public countryCode: any;
  public countryWallets: Country;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.fetchAllWalletsByCountryCode();
  }

  public fetchAllWalletsByCountryCode(): void  {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.countryCode = params.get('countryCode');
        this.imrhService.fetchAllWalletsByCountryCode(this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.countryWallets = response.data;
            }
            this.toastService.presentToast(response.message);
            this.loaderService.hideLoader();
          },
          error => {
            this.loaderService.hideLoader();
            this.toastService.presentToast(error.error);
        });
      });
    });
  }

  public enableDisableWallet(index:any, checked:any, payload: Wallet):void {
    this.loaderService.showLoader().then(()=>{
      if (checked) {
        this.countryWallets.wallets[index].enabled = 'Y';
        payload.enabled = 'Y';
      } else {
        this.countryWallets.wallets[index].enabled = 'N';
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableWallet(payload)
      .pipe(first()).subscribe(response => {
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

  public addWallet(): void {
    this.router.navigate(['/app-add-global-wallet'], {
      queryParams: { 
        countryCode: this.countryCode
      }
    });
  }

  public editWalletDetail(payload: Wallet) {
    this.router.navigate(['/app-edit-global-wallet'], { 
      queryParams: { 
        walletId: payload.walletId
      }
    });
  }

  public deleteBank(index: any, payload: Wallet): void {
    this.alertController.create({
      header: 'Delete Wallet',
      subHeader: 'Are you sure to delte wallet?',
      message: 'Enter the country code to delete the wallet.',
      inputs: [
        {
          name: 'countryCode',
          placeholder: 'Eg.PAK',

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
            if (this.countryCode == data.countryCode) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteWallet(payload.walletId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.countryWallets.wallets.splice(index, 1);
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