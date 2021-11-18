import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back button
import { first } from 'rxjs/operators';
import { City } from '../../../../model/city';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-edit-global-city',
  templateUrl: 'edit-global-city.component.html',
  styleUrls: ['edit-global-city.component.scss'],
})
export class EditGlobalCityComponent implements OnInit {

  public cityId: any;
  public city: City;
  public cityForm: FormGroup;
  public cityImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.cityForm = this.fb.group({
      cityId: new FormControl(Validators.required),
      cityName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      enabled: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.cityId = params.get('cityId');
        this.imrhService.findByCityId(this.cityId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.city = response.data;
              this.cityForm.setValue({
                cityId: this.city.cityId,
                cityName: this.city.cityName,
                enabled: this.city.enabled == 'Y' ? true: false,
                country: this.city.country.countryName
              });
              this.cityImageFile = {
                link: this.city.country.countryImageUrl
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

  public updateCity(payload: any): void {
    this.city.cityName = payload.cityName;
    console.log(this.city);
    this.loaderService.showLoader().then(()=>{
      this.imrhService.updateCity(this.city)
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