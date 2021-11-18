import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Partner } from '../../../../model/partner';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-add-mto-partner-customer',
  templateUrl: 'add-partner-customer.component.html',
  styleUrls: ['add-partner-customer.component.scss'],
})
export class AddMtoPartnerCustomerComponent implements OnInit {

  public partnerList :Array<Partner>;
  public partnerCustomerForm: FormGroup;

  constructor(public fb: FormBuilder, private location: Location,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ngOnInit(): any {
    this.partnerCustomerFormInit();
    this.fetchAllMtoPartner();
  }

  public partnerCustomerFormInit() {
    this.partnerCustomerForm = this.fb.group({
      customerMsdin: this.fb.array([this.buildItem()]),
    });
  }

  public buildItem(): any {
    return new FormGroup({
      customerNumber: new FormControl('', Validators.required),
      partnerId: new FormControl('', Validators.required),
    });
  }

  public get customerMsdinForms(): FormArray {
    return this.partnerCustomerForm.get('customerMsdin') as FormArray;
  }

  public customerMsdinAddItem(): void {
    this.customerMsdinForms.push(this.buildItem());
  }

  public customerMsdinRemoveItem(index: number) {
    this.customerMsdinForms.removeAt(index);
  }

  public fetchAllMtoPartner(): void {
    this.imrhService.fetchAllMtoPartner()
    .pipe(first()).subscribe(
      response => {
        if (response.status === 'SUCCESSFUL') {
          this.partnerList = response.data;
        } else {
          this.toastService.presentToast(response.message);
        }
      },
      error => {
        this.toastService.presentToast(error.error);
    });
  }

  public createCustomerMsisdn(partnerCustomer: any): void {
    this.loaderService.showLoader().then(()=>{
      this.imrhService.createCustomerMsisdn(partnerCustomer.customerMsdin)
      .pipe(first()).subscribe(
        response => {
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
          if (response.status === 'SUCCESSFUL') {
            this.partnerCustomerFormInit()
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
         let partner = this.partnerList[index];
         let flag = 'assets/Not-Found.png';
         if (partner.partnerImageUrl) {
          flag = partner.partnerImageUrl;
         }
         element.innerHTML=element.innerHTML
         .concat('<img class="partner-image" style="width: 30px;height:16px;float: right;" src="'+flag+'" />');
       }
    }, 1000);
  }
  
}