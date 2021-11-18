import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from '../../../model/country';
import { Bank } from '../../../model/bank';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-global-bank',
  templateUrl: 'global-bank.component.html',
  styleUrls: ['global-bank.component.scss'],
})
export class GlobalBankComponent {

  public searchFilter: any = '';
  public countryCode: any;
  public countryBanks: Country;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): void {
    this.fetchAllBankByCountryCode();
  }

  public fetchAllBankByCountryCode(): void {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.countryCode = params.get('countryCode');
        this.imrhService.fetchAllBankByCountryCode(this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.countryBanks = response.data;
            }
            //this.toastService.presentToast(response.message);
            this.loaderService.hideLoader();
          },
          error => {
            this.loaderService.hideLoader();
            this.toastService.presentToast(error.error);
        });
      });
    });
  }

  public enableDisableBank(index:any, checked:any, payload: Bank):void {
    this.loaderService.showLoader().then(()=>{
      if (checked) {
        this.countryBanks.banks[index].enabled = 'Y';
        payload.enabled = 'Y';
      } else {
        this.countryBanks.banks[index].enabled = 'N';
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableBank(payload)
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

  public addBank(): void {
    this.router.navigate(['/app-add-global-bank'], {
      queryParams: { 
        countryCode: this.countryCode
      }
    });
  }

  public editBankDetail(payload: Bank) {
    this.router.navigate(['/app-edit-global-bank'], { 
      queryParams: { 
        bankId: payload.bankId
      }
    });
  }

  public deleteBank(index: any, payload: Bank): void {
    this.alertController.create({
      header: 'Delete Bank',
      subHeader: 'Are you sure to delte bank?',
      message: 'Enter the country code to delete the bank.',
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
                this.imrhService.deleteBank(payload.bankId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.countryBanks.banks.splice(index, 1);
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
