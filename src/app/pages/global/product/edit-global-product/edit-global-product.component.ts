import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; // -> use for back button
import { first } from 'rxjs/operators';
import { Product } from '../../../../model/product';
import { ImageDetail } from '../../../../model/imageDetail';
import { IMRHService } from '../../../../service/imrh.service';
import { LoaderService } from '../../../../service/loader.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-edit-global-product',
  templateUrl: 'edit-global-product.component.html',
  styleUrls: ['edit-global-product.component.scss'],
})
export class EditGlobalProductComponent implements OnInit {

  public productId: any;
  public product :Product;
  public productForm: FormGroup;
  public productImageFile: ImageDetail;

  constructor(private activeRoute: ActivatedRoute, private location: Location,
    public fb: FormBuilder, private imrhService: IMRHService,
    private loaderService: LoaderService, private toastService: ToastService) {
  }

  public ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: new FormControl('', Validators.required),
      productName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      productImageUrl: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required)
    });
    this.loaderService.showLoader().then(()=>{
      this.activeRoute.queryParamMap
      .subscribe((params: ParamMap) => {
        this.productId = params.get('productId');
        this.imrhService.findByProductId(this.productId)
        .pipe(first()).subscribe(
          response => {
            if (response.status === 'SUCCESSFUL') {
              this.product = response.data;
              this.productImageFile = {
                link: this.product.productImageUrl
              };
              this.productForm.setValue({
                productId: this.product.productId,
                productName: this.product.productName,
                productImageUrl: this.product.productImageUrl,
                enabled: this.product.enabled === 'Y' ? true : false,  
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
        this.productImageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  public updateProduct(payload: Product): void {
    if (payload.enabled) {
      payload.enabled = 'Y';
    } else {
      payload.enabled = 'N';
    }
    this.loaderService.showLoader().then(()=>{
      this.imrhService.updateProduct(payload)
      .pipe(first()).subscribe(
        response => {
          if (response.status === 'SUCCESSFUL') {
            this.toastService.presentToast(response.message);
            this.loaderService.hideLoader();
            this.location.back();
          } else {
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

}