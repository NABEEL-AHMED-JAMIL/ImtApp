import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back butto
import { first } from 'rxjs/operators';
import { Bank } from '../../../../model/bank';
import { Country } from '../../../../model/country';
import { Partner } from '../../../../model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-add-mto-bank',
  templateUrl: 'add-mto-bank.component.html',
  styleUrls: ['add-mto-bank.component.scss'],
})
export class AddMtoBankComponent implements OnInit {

  public partnerId: string;
  public countryCode: string;
  public partner: Partner;
  public country: Country;
  public bankList: Array<Bank>;
  public attachMtoBankWithMtoPartnerForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    public alertController: AlertController, private loaderService: LoaderService,
    private toastService: ToastService) {
  }

  public ngOnInit(): any {
    this.attachMtoBankWithMtoPartnerForm = this.fb.group({
      partnerId: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required)
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
                    this.attachMtoBankWithMtoPartnerForm.setValue({
                      partnerId:  this.partner.partnerId,
                      country: this.country.countryCode,
                      bank: ''
                    });
                  }
                }, error => {});
                this.imrhService.fetchAllBankByCountryCode(this.countryCode)
                .pipe(first()).subscribe(response => {
                    if (response.status === 'SUCCESSFUL') {
                      this.bankList = response.data.banks;
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

  public attachMtoBankWithMtoPartner(payload: any): void {
    this.loaderService.showLoader().then(()=> {
      this.imrhService.attachMtoBankWithMtoPartner(payload)
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
         let bank = this.bankList[index];
         let flag = 'assets/Not-Found.png';
         if (bank.bankImageUrl) {
          flag = bank.bankImageUrl;
         }
         element.innerHTML=element.innerHTML.concat('<img class="bank-image" style="width: 30px;height:16px;float: right;" src="'+flag+'" />');
       }
    }, 1000);
  }

}