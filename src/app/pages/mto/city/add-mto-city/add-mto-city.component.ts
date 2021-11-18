import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back butto
import { first } from 'rxjs/operators';
import { City } from '../../../../model/city';
import { Country } from '../../../../model/country';
import { Partner } from '../../../../model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-add-mto-city',
  templateUrl: 'add-mto-city.component.html',
  styleUrls: ['add-mto-city.component.scss'],
})
export class AddMtoCityComponent implements OnInit {

  public partnerId: string;
  public countryCode: string;
  public partner: Partner;
  public country: Country;
  public cityList: Array<City>;  
  public attachMtoCityWithMtoPartnerForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    public alertController: AlertController, private loaderService: LoaderService,
    private toastService: ToastService) {
  }

  public ngOnInit(): any {
    this.attachMtoCityWithMtoPartnerForm = this.fb.group({
      partnerId: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.countryCode = params.get('countryCode');
        this.imrhService.findByMtoPartnerId(this.partnerId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
              this.imrhService.findByCountryCode(this.countryCode)
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.country = response.data;
                    this.attachMtoCityWithMtoPartnerForm.setValue({
                      partnerId:  this.partner.partnerId,
                      country: this.country.countryCode,
                      city: ''
                    });
                  }
                }, error => {});
              this.imrhService.fetchAllCityByCountryCode(this.countryCode)
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.cityList = response.data.cities;
                  }
                }, error => {});
            } else {
              this.toastService.presentToast(response.message);
            }
            this.loaderService.hideLoader();
          }, error => {
            this.loaderService.hideLoader();
            this.toastService.presentToast(error.error);
        });
      });
    });
  }

  public attachMtoCityWithMtoPartner(payload: any): void {
    payload.country = null;
    this.loaderService.showLoader().then(()=> {
      this.imrhService.attachMtoCityWithMtoPartner(payload)
      .pipe(first()).subscribe(response => {
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
          if (response.status === 'SUCCESSFUL') {
            this.partner = response.data;
            this.location.back();
          }
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }
  
}