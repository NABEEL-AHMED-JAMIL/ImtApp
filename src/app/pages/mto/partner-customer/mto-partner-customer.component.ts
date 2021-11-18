import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';

export interface Pageable {
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
};

export interface PartnerCustomer {
  partnerId?: number;
  partnerName?: string;
  partnerImageUrl?: string;
  customerId?: number;
  partnerCustomer?: string;
};

@Component({
  selector: 'app-mto-partner-customer',
  templateUrl: 'mto-partner-customer.component.html',
  styleUrls: ['mto-partner-customer.component.scss'],
})
export class MtoPartnerCustomerComponent {

  @ViewChild(IonInfiniteScroll)
  public infiniteScroll: IonInfiniteScroll;
  private phoneRegex: string = "^((\\+92)|(0092))-{0,1}\\d{3}-{0,1}\\d{7}$|^\\d{11}$|^\\d{4}-\\d{7}$";
  public partnerCustomerList: Array<PartnerCustomer>;
  public pageable: Pageable = {
    pageNumber: 0,
    pageSize: 50
  };

  constructor(private menu: MenuController,
    private activeRoute: ActivatedRoute, private router: Router,
    private imrhService: IMRHService, private loaderService: LoaderService,
    public alertController: AlertController, private toastService: ToastService) {
  }

  public ionViewWillEnter(): void {
    this.menu.close();
    this.fetchCustomerMsisdn(this.pageable.pageNumber, this.pageable.pageSize);
  }

  public loadData(event): void {
    setTimeout(() => {
      event.target.complete();
      if (this.pageable.totalElements == this.partnerCustomerList.length) {
        event.target.disabled = true;
      }
      if (this.pageable.totalElements !== this.partnerCustomerList.length) {
        this.fetchCustomerMsisdn(this.pageable.pageNumber+1, this.pageable.pageSize);
      }
    }, 500);
  }

  public async fetchCustomerMsisdn(pageNumber: number, pageSize: number) {
    this.loaderService.showLoader().then(()=>{
      this.imrhService.fetchCustomerMsisdn(pageNumber, pageSize)
      .pipe(first()).subscribe(
        response => {
          if (response.status === 'SUCCESSFUL') {
            if (this.partnerCustomerList) {
              this.partnerCustomerList.push.apply(this.partnerCustomerList, response.data.content);
            } else {
              this.partnerCustomerList = response.data.content;
            }
            this.pageable = {
              pageNumber: response.data.pageNumber,
              pageSize: response.data.pageSize,
              totalElements: response.data.totalElements,
              totalPages: response.data.totalPages,
            }
            console.log("Length " + this.partnerCustomerList.length);
            console.log(this.pageable);
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
  }

  public async searchCustomerMsisdn(event: any) {
    if (event.srcElement.value.match(this.phoneRegex)) {
      this.pageable = {
        pageNumber: 0,
        pageSize: 500
      };
      let payload = {
        customerNumber: event.srcElement.value
      }
      this.loaderService.showLoader().then(()=>{
        this.imrhService.searchCustomerMsisdn(payload)
        .pipe(first()).subscribe(
          response => {
            if (response.status === 'SUCCESSFUL') {
              this.partnerCustomerList = response.data;
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
    }
  }

  public clearSearch(event: any): void {
    this.partnerCustomerList = Array<PartnerCustomer>();
    this.pageable = {
      pageNumber: 0,
      pageSize: 50
    };
    debugger
    this.fetchCustomerMsisdn(this.pageable.pageNumber, this.pageable.pageSize);
  }

  public deletePartnerCustomerMsisdn(index: any, payload: PartnerCustomer): void {
    this.alertController.create({
      header: 'Delete Mto Country',
      subHeader: 'Are you sure to delte country?',
      message: 'Note this will delete all link city,bank,wallet setting.',
      inputs: [
        {
          name: 'delete',
          placeholder: 'Eg.Delete',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            if ('Delete' == data.delete) {
              this.loaderService.showLoader().then(()=>{
                this.imrhService.deletePartnerCustomerMsisdn(payload)
                .pipe(first()).subscribe(
                  response => {
                    if (response.status === 'SUCCESSFUL') {
                      this.partnerCustomerList.splice(index, 1);
                    }
                    this.toastService.presentToast(response.message);
                    this.loaderService.hideLoader();
                  },
                  error => {
                    this.loaderService.hideLoader();
                    this.toastService.presentToast(error.error);
                });
              });          
            } else {
              this.toastService.presentToast('Code not match');
            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  public customerMsdinAddItem() {
    this.router.navigate(['/app-add-mto-partner-customer']);
  }
  
}