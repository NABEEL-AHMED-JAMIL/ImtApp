import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from '../../../model/country';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-global-country',
  templateUrl: 'global-country.component.html',
  styleUrls: ['global-country.component.scss'],
})
export class GlobalCountryComponent {

  public searchFilter: any = '';
  public countryList :Array<Country>;

  constructor(private menu: MenuController,
    private router: Router, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.menu.close();
    this.fetchAllCountry();
  }

  public fetchAllCountry(): void {
    this.loaderService.showLoader()
    .then(()=>{
      this.imrhService.fetchAllCountry()
      .pipe(first()).subscribe(response => {
          if (response.status === 'SUCCESSFUL') {
            this.countryList = response.data;
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

  public enableDisableCountry(index:any, checked:any, payload: Country): void {
    this.loaderService.showLoader()
    .then(()=>{
      if (checked) {
        this.countryList[index].enabled = 'Y';
        payload.enabled = 'Y';
      } else {
        this.countryList[index].enabled = 'N';
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableCountry(payload)
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

  public viewCountryDetail(payload: Country): void {
    this.router.navigate(['/app-view-global-country'], { 
      queryParams: { 
        countryCode: payload.countryCode
      }
    });
  }

}