import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back butto
import { first } from 'rxjs/operators';
import { Wallet } from '../../../../model/wallet';
import { Country } from '../../../../model/country';
import { Partner } from '../../../../model/partner';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-add-mto-wallet',
  templateUrl: 'add-mto-wallet.component.html',
  styleUrls: ['add-mto-wallet.component.scss'],
})
export class AddMtoWalletComponent implements OnInit {

  public partnerId: string;
  public countryCode: string;
  public partner: Partner;
  public country: Country;
  public walletList: Array<Wallet>;
  public attachMtoWalletWithMtoPartnerForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    public alertController: AlertController, private loaderService: LoaderService,
    private toastService: ToastService) {
  }

  public ngOnInit(): any {
    this.attachMtoWalletWithMtoPartnerForm = this.fb.group({
      partnerId: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      wallet: new FormControl('', Validators.required)
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
                    this.attachMtoWalletWithMtoPartnerForm.setValue({
                      partnerId:  this.partner.partnerId,
                      country: this.country.countryCode,
                      wallet: ''
                    });
                  }
                }, error => {});
                this.imrhService.fetchAllWalletsByCountryCode(this.countryCode)
                .pipe(first()).subscribe(response => {
                    if (response.status === 'SUCCESSFUL') {
                      this.walletList = response.data.wallets;
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

  public attachMtoWalletWithMtoPartner(payload: any): void {
    payload.country = null;
    this.loaderService.showLoader().then(()=> {
      this.imrhService.attachMtoWalletWithMtoPartner(payload)
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
         let wallet = this.walletList[index];
         let flag = 'assets/Not-Found.png';
         if (wallet.walletImageUrl) {
          flag = wallet.walletImageUrl;
         }
         element.innerHTML=element.innerHTML.concat('<img class="wallet-image" style="width: 30px;height:16px;float: right;" src="'+flag+'" />');
       }
   }, 1000);
  }

}