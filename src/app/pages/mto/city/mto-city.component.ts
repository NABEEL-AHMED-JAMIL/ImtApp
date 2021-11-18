import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

export interface MtoPartnerCity {
  cityId?: number;
  cityName?: string;
  cityEnabled?: string;
  countryCode?: string;
  countryEnabled?: string;
  countryImageUrl?: string;
  countryName?: string;
  partnerId?: number;
  partnerImageUrl?: string;
  partnerName?: string;
}

@Component({
  selector: 'app-mto-city',
  templateUrl: 'mto-city.component.html',
  styleUrls: ['mto-city.component.scss'],
})
export class MtoCityComponent {

  public searchFilter: any = '';
  public partnerId: any;
  public countryImageUrl: string;
  public partnerImageUrl: string;
  public countryCode: string;
  public citieList :Array<MtoPartnerCity>;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.countryCode = params.get('countryCode');
        this.imrhService.findMtoCityByMtoPartnerIdAndMtoCountryCode(this.partnerId, this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.citieList = response.data;
              if (this.citieList.length > 0) {
                this.countryImageUrl = this.citieList[0].countryImageUrl;
                this.partnerImageUrl = this.citieList[0].partnerImageUrl;
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

  public deleteMtoCityLinkMtoPartner(index: any, payload: MtoPartnerCity): void {
    this.alertController.create({
      header: 'Delete Partner City',
      subHeader: 'Are you sure to delte partner city?',
      message: 'Enter the city name to delete the partner city.',
      inputs: [
        {
          name: 'cityName',
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
            if (payload.cityName == data.cityName) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteMtoCityLinkMtoPartner(payload.partnerId, payload.cityId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.citieList.splice(index, 1);
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

  public attachMtoCityWithMtoPartner(): void {
    this.router.navigate(['/app-add-mto-city'], { 
      queryParams: {
        partnerId: this.partnerId,
        countryCode: this.countryCode
      }
    });
  }

  
}