import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from '../../../model/product';
import { IMRHService } from '../../../service/imrh.service';
import { LoaderService } from '../../../service/loader.service';
import { ToastService } from '../../../service/toast.service';


@Component({
  selector: 'app-global-product',
  templateUrl: 'global-product.component.html',
  styleUrls: ['global-product.component.scss'],
})
export class GlobalProductComponent {

  public productList :Array<Product>;

  constructor(private menu: MenuController,
    private imrhService: IMRHService, private router: Router,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ionViewWillEnter(): any {
    this.menu.close();
    this.fetchAllProduct();
  }

  public fetchAllProduct(): void {
    this.loaderService.showLoader().then(()=>{
      this.imrhService.fetchAllProduct()
      .pipe(first()).subscribe(
        response => {
          if (response.status === 'SUCCESSFUL') {
            this.productList = response.data;
          }
          this.toastService.presentToast(response.message);
          this.loaderService.hideLoader();
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

  public enableDisableProduct(index:any, checked:any, payload: Product): void {
    this.loaderService.showLoader().then(()=>{
      if (checked) {
        this.productList[index].enabled = 'Y';
        payload.enabled = 'Y';
      } else {
        this.productList[index].enabled = 'N';
        payload.enabled = 'N';
      }
      this.imrhService.enableDisableProduct(payload)
      .pipe(first()).subscribe(
        response => {
          if (response.status === 'SUCCESSFUL') {
            this.toastService.presentToast(response.message);
            this.loaderService.hideLoader();
          }
        },
        error => {
          this.loaderService.hideLoader();
          this.toastService.presentToast(error.error);
      });
    });
  }

  public updateProduct(payload: Product): void {
    this.router.navigate(['/app-edit-global-product'], { 
      queryParams: { 
        productId: payload.productId
      }
    });
  }

}