import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Partner } from '../../../../model/partner';
import { ImageDetail } from '../../../../model/imageDetail';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';


@Component({
  selector: 'app-view-mto-partner',
  templateUrl: 'view-mto-partner.component.html',
  styleUrls: ['view-mto-partner.component.scss'],
})
export class ViewMtoPartnerComponent {

  public partnerId: any;
  public partner: Partner;
  public partnerImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): void {
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.partnerId = params.get('partnerId');
        this.imrhService.findByMtoPartnerId(this.partnerId)
        .pipe(first()).subscribe(response => {
            if (response.status === 'SUCCESSFUL') {
              this.partner = response.data;
              this.partnerImageFile = {
                link: this.partner.partnerImageUrl
              };
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

  public enableDisablePartner(checked:any, payload: Partner):void {
    this.loaderService.showLoader().then(()=>{
      if (checked) {
        payload.enabled = 'Y';
      } else {
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableMtoPartner(payload)
      .pipe(first()).subscribe(response => {
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

  public findMtoCountryByMtoPartnerId(payload: Partner): void {
    this.router.navigate(['/app-mto-country'], { 
      queryParams: { 
        partnerId: payload.partnerId
      }
    });
  }

}