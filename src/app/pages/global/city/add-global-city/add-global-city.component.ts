import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back button
import { first } from 'rxjs/operators';
import { Country } from '../../../../model/country';
import { City } from '../../../../model/city';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-add-global-city',
  templateUrl: 'add-global-city.component.html',
  styleUrls: ['add-global-city.component.scss'],
})
export class AddGlobalCityComponent implements OnInit {

  public city: City;
  public countryCode: any;
  public country :Country;
  public cityForm: FormGroup;
  public cityImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.cityForm = this.fb.group({
      cityName: new FormControl('', [Validators.required]),
      enabled: new FormControl([Validators.required]),
      country: new FormControl('', [Validators.required])
    });
    this.loaderService.showLoader().then(()=> {
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.countryCode = params.get('countryCode');
        this.imrhService.findByCountryCode(this.countryCode)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.country = response.data;
              this.cityImageFile = {
                link: this.country.countryImageUrl
              }
              this.cityForm.setValue({
                cityName: '',
                enabled: this.country.enabled == 'Y' ? true: false,
                country: this.country.countryName
              });
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

  public createCity(payload: any): void {
    this.city = payload;
    if (payload.enabled) {
      this.city.enabled = 'Y';
    } else {
      this.city.enabled = 'N';
    }
    this.city.country = this.country;
    this.loaderService.showLoader().then(()=> {
      this.imrhService.createCity(this.city)
      .pipe(first()).subscribe(response => {
          if (response.status === 'SUCCESSFUL') {
            this.city = response.data;
          } 
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
          this.location.back();
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

}