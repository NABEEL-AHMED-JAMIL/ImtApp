import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from 'src/app/model/country';
import { Partner } from 'src/app/model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-mto-country',
  templateUrl: 'mto-country.component.html',
  styleUrls: ['mto-country.component.scss'],
})
export class MtoCountryComponent {

  public searchFilter: any = '';
  public partnerId: any;
  public partner: Partner;
  public mtoPartnerCountryList :Array<Country>;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.imrhService.findMtoCountryByMtoPartnerId(this.partnerId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
              this.mtoPartnerCountryList = this.partner.countries;
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

  public deleteMtoCountryLinkMtoPartner(index: any, payload: Country) {
    this.alertController.create({
      header: 'Delete Mto Country',
      subHeader: 'Are you sure to delte country?',
      message: 'Note this will delete all link city,bank,wallet setting.',
      inputs: [
        {
          name: 'delete',
          placeholder: 'Eg.Delete',

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
            if ('Delete' == data.delete) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deleteMtoCountryLinkMtoPartner(this.partnerId, payload.countryCode)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.mtoPartnerCountryList.splice(index, 1);
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

  public attachMtoCountryWithMtoPartner() {
    this.router.navigate(['/app-add-mto-country'], { 
      queryParams: {
        partnerId: this.partnerId,
      }
    });
  }

  public viewCountryDetail(payload: Country) {
    this.router.navigate(['/app-view-mto-country'], { 
      queryParams: {
        partnerId: this.partnerId,
        countryCode: payload.countryCode
      }
    });
  }
  
}