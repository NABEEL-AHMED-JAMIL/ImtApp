import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back butto
import { first } from 'rxjs/operators';
import { Partner } from '../../../../model/partner';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

export interface KeyValue {
  key:string;
  value:string;
}

@Component({
  selector: 'app-edit-mto-partner',
  templateUrl: 'edit-mto-partner.component.html',
  styleUrls: ['edit-mto-partner.component.scss'],
})
export class EditMtoPartnerComponent implements OnInit {

  public partnerId: any;
  public partner: Partner;
  public partnerForm: FormGroup;
  public partnerImageFile: ImageDetail;
  public mtoCategory:KeyValue[] = [
    {
      key: 'Preferential MTOs with opt out',
      value: 'Preferential MTOs with opt out'
    },
    {
      key: 'Preferential MTOs without opt out',
      value: 'Preferential MTOs without opt out'
    }
  ];
  public transferSpeed:KeyValue[] = [
    {
      key: 'Realtime',
      value: 'Realtime'
    },
    {
      key: 'Not Realtime',
      value: 'Not Realtime'
    }
  ];
  
  constructor(private activeRoute: ActivatedRoute, private router: Router,
    public fb: FormBuilder, private location: Location, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.partnerForm = this.fb.group({
      partnerId: new FormControl('', Validators.required),
      partnerName: new FormControl('', Validators.required),
      partnerImageUrl: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required),
      preferenceOrder: new FormControl('', Validators.required),
      forexMarginShare: new FormControl('', Validators.required),
      partnerShare: new FormControl('', Validators.required),
      transferSpeed: new FormControl('', Validators.required),
      partnerCategory: new FormControl('', Validators.required),
      partnerTxtIdLabel: new FormControl('', Validators.required),
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.imrhService.findByMtoPartnerId(this.partnerId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
              this.partnerForm.setValue({
                partnerId: this.partner.partnerId,
                partnerName: this.partner.partnerName,
                partnerImageUrl: this.partner.partnerImageUrl,
                enabled: this.partner.enabled == 'Y' ? true: false,
                preferenceOrder: this.partner.preferenceOrder,
                forexMarginShare: this.partner.forexMarginShare,
                partnerShare: this.partner.partnerShare,
                transferSpeed: this.partner.transferSpeed,
                partnerCategory: this.partner.partnerCategory,
                partnerTxtIdLabel: this.partner.partnerTxtIdLabel
              });
              this.partnerImageFile = {
                link: this.partner.partnerImageUrl
              }
            }
            this.toastService.presentToast(response.message);
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
        this.partnerImageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateMtoPartner(payload: any): void {
    this.partner = payload;
    if (payload.enabled) {
      this.partner.enabled = 'Y';
    } else {
      this.partner.enabled = 'N';
    }
    this.loaderService.showLoader().then(()=> {
      if (this.partnerImageFile.name) {
        this.partnerImageFile.folderName = 'partner';
        this.imrhService.resourceUpload(this.partnerImageFile)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner.partnerImageUrl = response.data;
              this.imrhService.updateMtoPartner(this.partner)
              .pipe(first()).subscribe(response => {
                  if (response.status === 'SUCCESSFUL') {
                    this.partner = response.data;
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
        this.imrhService.updateMtoPartner(this.partner)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
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