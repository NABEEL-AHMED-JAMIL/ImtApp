import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';
import { ProfilePermissionGuard } from '../app/guards/profile.permission.guard';
import { WelcomeComponent } from '../app/pages/auth/welcome/welcome.component';
import { LoginComponent } from '../app/pages/auth/login/login.component';
import { RegisterComponent } from '../app/pages/auth/register/register.component';
import { ForgotComponent } from '../app/pages/auth/forgot/forgot.component';
import { GlobalProductComponent } from '../app/pages/global/product/global-product.component';
import { EditGlobalProductComponent } from '../app/pages/global/product/edit-global-product/edit-global-product.component';
import { GlobalCountryComponent } from '../app/pages/global/country/global-country.component';
import { ViewGlobalCountryComponent } from '../app/pages/global/country/view-global-country/view-global-country.component';
import { GlobalCityComponent } from '../app/pages/global/city/global-city.component';
import { AddGlobalCityComponent } from '../app/pages/global/city/add-global-city/add-global-city.component';
import { EditGlobalCityComponent } from '../app/pages/global/city/edit-global-city/edit-global-city.component';
import { GlobalBankComponent } from '../app/pages/global/bank/global-bank.component';
import { AddGlobalBankComponent } from '../app/pages/global/bank/add-global-bank/add-global-bank.component';
import { EditGlobalBankComponent } from '../app/pages/global/bank/edit-global-bank/edit-global-bank.component';
import { GlobalWalletComponent } from '../app/pages/global/wallet/global-wallet.component';
import { AddGlobalWalletComponent } from '../app/pages/global/wallet/add-global-wallet/add-global-wallet.component';
import { EditGlobalWalletComponent } from '../app/pages/global/wallet/edit-global-wallet/edit-global-wallet.component';
import { MtoPartnerComponent } from '../app/pages/mto/partner/mto-partner.component';
import { ViewMtoPartnerComponent } from '../app/pages/mto/partner/view-mto-partner/view-mto-partner.component';
import { EditMtoPartnerComponent } from '../app/pages/mto/partner/edit-mto-partner/edit-mto-partner.component';
import { MtoCountryComponent } from '../app/pages/mto/country/mto-country.component';
import { AddMtoCountryComponent } from '../app/pages/mto/country/add-mto-country/add-mto-country.component';
import { ViewMtoCountryComponent } from '../app/pages/mto/country/view-mto-country/view-mto-country.component';
import { MtoCityComponent } from '../app/pages/mto/city/mto-city.component';
import { AddMtoCityComponent } from '../app/pages/mto/city/add-mto-city/add-mto-city.component';
import { MtoBankComponent } from '../app/pages/mto/bank/mto-bank.component';
import { AddMtoBankComponent } from '../app/pages/mto/bank/add-mto-bank/add-mto-bank.component';
import { MtoWalletComponent } from '../app/pages/mto/wallet/mto-wallet.component';
import { AddMtoWalletComponent } from '../app/pages/mto/wallet/add-mto-wallet/add-mto-wallet.component';
import { MtoPartnerCustomerComponent } from '../app/pages/mto/partner-customer/mto-partner-customer.component';
import { AddMtoPartnerCustomerComponent } from '../app/pages/mto/partner-customer/add-partner-customer/add-partner-customer.component';
import { MtoPartnerCountryProductComponent } from '../app/pages/mto/partner-country-product/mto-partner-country-product.component';


const routes: Routes = [
  {
    path: '', 
    redirectTo: 'app-global-product', 
    pathMatch: 'full'
  },
  {
    path: 'app-welcome',
    component: WelcomeComponent
  },
  {
    path: 'app-login',
    component: LoginComponent
  },
  {
    path: 'app-register',
    component: RegisterComponent
  },
  {
    path: 'app-forgot',
    component: ForgotComponent
  },
  {
    path: 'app-global-product',
    component: GlobalProductComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-edit-global-product',
    component: EditGlobalProductComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-global-country',
    component: GlobalCountryComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-view-global-country',
    component: ViewGlobalCountryComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-global-city',
    component: GlobalCityComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-global-city',
    component: AddGlobalCityComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-edit-global-city',
    component: EditGlobalCityComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-global-bank',
    component: GlobalBankComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-global-bank',
    component: AddGlobalBankComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-edit-global-bank',
    component: EditGlobalBankComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-global-wallet',
    component: GlobalWalletComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-global-wallet',
    component: AddGlobalWalletComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-edit-global-wallet',
    component: EditGlobalWalletComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-partner',
    component: MtoPartnerComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-view-mto-partner',
    component: ViewMtoPartnerComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-edit-mto-partner',
    component: EditMtoPartnerComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-country',
    component: MtoCountryComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-mto-country',
    component: AddMtoCountryComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-view-mto-country',
    component: ViewMtoCountryComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-city',
    component: MtoCityComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-mto-city',
    component: AddMtoCityComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-bank',
    component: MtoBankComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-mto-bank',
    component: AddMtoBankComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-wallet',
    component: MtoWalletComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-mto-wallet',
    component: AddMtoWalletComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-partner-country-product',
    component: MtoPartnerCountryProductComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-mto-partner-customer',
    component: MtoPartnerCustomerComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'app-add-mto-partner-customer',
    component: AddMtoPartnerCustomerComponent,
    //canActivate: [AuthGuard]
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
