import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back butto
import { first } from 'rxjs/operators';
import { Country } from '../../../../model/country';
import { Partner } from '../../../../model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-add-mto-country',
  templateUrl: 'add-mto-country.component.html',
  styleUrls: ['add-mto-country.component.scss'],
})
export class AddMtoCountryComponent implements OnInit {

  public partnerId: any;
  public partner: Partner;
  public listCountry: Array<Country>;
  public attachMtoCountryWithMtoPartnerForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    public alertController: AlertController, private loaderService: LoaderService,
    private toastService: ToastService) {
  }

  public ngOnInit(): any {
    this.attachMtoCountryWithMtoPartnerForm = this.fb.group({
      partnerId: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.imrhService.findByMtoPartnerId(this.partnerId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
              this.attachMtoCountryWithMtoPartnerForm.setValue({
                partnerId:  this.partner.partnerId,
                country: ''
              });
              this.imrhService.fetchAllCountry()
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.listCountry = response.data;
                  }
                }, error => {
                  this.toastService.presentToast(error.error);
              });
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

  public attachMtoCountryWithMtoPartner(payload: any): void {
    this.loaderService.showLoader().then(()=> {
      this.imrhService.attachMtoCountryWithMtoPartner(payload)
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

  public loadFlags(): void {
    setTimeout(() => {
      let radios=document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < radios.length; index++) {
         let element = radios[index];
         let country = this.listCountry[index];
         let flag = 'assets/Not-Found.png';
         if (country.countryImageUrl) {
          flag = country.countryImageUrl;
         }
         element.innerHTML=element.innerHTML.concat('<img class="country-image" style="width: 30px;height:16px;float: right;" src="'+flag+'" />');
       }
   }, 1000);
  }

}