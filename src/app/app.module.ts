import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    SearchFilterPipe,
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    GlobalProductComponent,
    EditGlobalProductComponent,
    GlobalCountryComponent,
    ViewGlobalCountryComponent,
    GlobalCityComponent,
    AddGlobalCityComponent,
    EditGlobalCityComponent,
    GlobalBankComponent,
    AddGlobalBankComponent,
    EditGlobalBankComponent,
    GlobalWalletComponent,
    AddGlobalWalletComponent,
    EditGlobalWalletComponent,
    MtoPartnerComponent,
    ViewMtoPartnerComponent,
    EditMtoPartnerComponent,
    MtoCountryComponent,
    AddMtoCountryComponent,
    ViewMtoCountryComponent,
    MtoCityComponent,
    AddMtoCityComponent,
    MtoBankComponent,
    AddMtoBankComponent,
    MtoWalletComponent,
    AddMtoWalletComponent,
    MtoPartnerCountryProductComponent,
    MtoPartnerCustomerComponent,
    AddMtoPartnerCustomerComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
