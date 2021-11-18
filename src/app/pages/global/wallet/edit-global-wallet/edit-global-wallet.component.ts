import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back button
import { first } from 'rxjs/operators';
import { Country } from '../../../../model/country';
import { Wallet } from '../../../../model/wallet';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-edit-global-wallet',
  templateUrl: 'edit-global-wallet.component.html',
  styleUrls: ['edit-global-wallet.component.scss'],
})
export class EditGlobalWalletComponent implements OnInit {

  public walletId: any;
  public wallet: Wallet;
  public country: Country;
  public walletForm: FormGroup;
  public walletImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.walletImageFile = {
      link: 'assets/Not-Found.png'
    }
    this.walletForm = this.fb.group({
      walletId: new FormControl(Validators.required),
      walletName: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.walletId = params.get('walletId');
        this.imrhService.findByWalletId(this.walletId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.wallet = response.data;
              this.country = this.wallet.country;
              if (this.wallet.walletImageUrl) {
                this.walletImageFile = {
                  link: this.wallet.walletImageUrl
                };
              }
              this.walletForm.setValue({
                walletId: this.wallet.walletId,
                walletName: this.wallet.walletName,
                enabled: this.wallet.enabled === 'Y' ? true : false,
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

  public imagesPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.walletImageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateWallet(payload: any): void {
    this.wallet = payload;
    if (payload.enabled) {
      this.wallet.enabled = 'Y';
    } else {
      this.wallet.enabled = 'N';
    }
    this.wallet.walletName = payload.walletName;
    this.wallet.country = this.country;
    this.loaderService.showLoader().then(()=> {
      if (this.walletImageFile.name) {
        this.walletImageFile.folderName = 'wallet';
        this.imrhService.resourceUpload(this.walletImageFile)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.wallet.walletImageUrl = response.data;
              this.imrhService.updateWallet(this.wallet)
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.wallet = response.data;
                  } 
                  this.toastService.presentToast(response.message);
                  this.loaderService.hideLoader();
                  this.location.back();
                },
                error => {
                  this.loaderService.hideLoader();
                  this.toastService.presentToast(error.error);
              });
            } else {
              this.toastService.presentToast(response.message);
            }
          },
          error => {
            this.loaderService.hideLoader();
            this.toastService.presentToast(error.error);
        });        
      } else {
        this.imrhService.updateWallet(this.wallet)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.wallet = response.data;
            } 
            this.toastService.presentToast(response.message);
            this.loaderService.hideLoader();
            this.location.back();
          },
          error => {
            this.loaderService.hideLoader();
            this.toastService.presentToast(error.error);
        });
      }
    });
  }
  
}