import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Country } from '../../../../model/country';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-view-global-country',
  templateUrl: 'view-global-country.component.html',
  styleUrls: ['view-global-country.component.scss'],
})
export class ViewGlobalCountryComponent {

  public countryCode: any;
  public country: Country;

  constructor(private activeRoute: ActivatedRoute,
    private imrhService: IMRHService, private loaderService: LoaderService,
    private toastService: ToastService) {
  }

  public ionViewWillEnter(): void {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.countryCode = params.get('countryCode');
        this.imrhService.findByCountryCode(this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.country = response.data;
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

}