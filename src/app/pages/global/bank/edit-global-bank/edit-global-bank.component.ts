import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back button
import { first } from 'rxjs/operators';
import { Country } from '../../../../model/country';
import { Bank } from '../../../../model/bank';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-edit-global-bank',
  templateUrl: 'edit-global-bank.component.html',
  styleUrls: ['edit-global-bank.component.scss'],
})
export class EditGlobalBankComponent implements OnInit {

  public bankId: any;
  public bank: Bank;
  public country: Country;
  public bankForm: FormGroup;
  public bankImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.bankImageFile = {
      link: 'assets/Not-Found.png'
    }
    this.bankForm = this.fb.group({
      bankId: new FormControl(Validators.required),
      bankName: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.bankId = params.get('bankId');
        this.imrhService.findByBankId(this.bankId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.bank = response.data;
              this.country = this.bank.country;
              if (this.bank.bankImageUrl) {
                this.bankImageFile = {
                  link: this.bank.bankImageUrl
                };
              }
              this.bankForm.setValue({
                bankId: this.bank.bankId,
                bankName: this.bank.bankName,
                enabled: this.bank.enabled === 'Y' ? true : false,
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
        this.bankImageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateBank(payload: any): void {
    this.bank = payload;
    if (payload.enabled) {
      this.bank.enabled = 'Y';
    } else {
      this.bank.enabled = 'N';
    }
    this.bank.bankName = payload.bankName;
    this.bank.country = this.country;
    this.loaderService.showLoader().then(()=> {
      if (this.bankImageFile.name) {
        this.bankImageFile.folderName = 'bank';
        this.imrhService.resourceUpload(this.bankImageFile)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.bank.bankImageUrl = response.data;
              this.imrhService.updateBank(this.bank)
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.bank = response.data;
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
        this.imrhService.updateBank(this.bank)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.bank = response.data;
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
