import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from '../../../model/country';
import { City } from '../../../model/city';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';


@Component({
  selector: 'app-global-city',
  templateUrl: 'global-city.component.html',
  styleUrls: ['global-city.component.scss'],
})
export class GlobalCityComponent {

  public searchFilter: any = '';
  public countryCode: any;
  public countryCitys: Country;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): void {
    this.fetchAllCityByCountryCode();
  }

  public fetchAllCityByCountryCode(): void {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.countryCode = params.get('countryCode');
        this.imrhService.fetchAllCityByCountryCode(this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.countryCitys = response.data;
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

  public enableDisableCity(index:any, checked:any, payload: City):void {
    this.loaderService.showLoader().then(()=>{
      if (checked) {
        this.countryCitys.cities[index].enabled = 'Y';
        payload.enabled = 'Y';
      } else {
        this.countryCitys.cities[index].enabled = 'N';
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableCity(payload)
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

  public addCity(): void {
    this.router.navigate(['/app-add-global-city'], { 
      queryParams: { 
        countryCode: this.countryCode
      }
    });
  }

  public updateCity(payload: City): void {
    this.router.navigate(['/app-edit-global-city'], { 
      queryParams: { 
        cityId: payload.cityId
      }
    });
  }

  public deleteCity(index: any, payload: City): void {
    this.alertController.create({
      header: 'Delete City',
      subHeader: 'Are you sure to delte city?',
      message: 'Enter the country code to delete the city.',
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
                this.imrhService.deleteCity(payload.cityId)
                .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.countryCitys.cities.splice(index, 1);
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