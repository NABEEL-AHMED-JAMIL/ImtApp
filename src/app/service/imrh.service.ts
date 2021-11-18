import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { GenericResponse } from '../model/generic-response';
import { RepositoryService } from './repository.service';
import { ImageDetail } from '../model/imageDetail';


@Injectable({ providedIn: 'root' })
export class IMRHService {

    constructor(private repositoryService: RepositoryService) { }

    public createBank(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.createBank, payload);
    }

    public deleteBank(bankId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteBank+'?bankId='+bankId);
    }
    
    public enableDisableAllBankByCountryCode(countryCode:any, enable:any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllBankByCountryCode+'?countryCode='+countryCode+'&enable='+enable);
    }
    
    public enableDisableBank(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableBank, payload);
    }
    
    public findByBankId(bankId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByBankId+'?bankId='+bankId);
    }

    public updateBank(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updateBank, payload);
    }
    
    public createCity(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.createCity, payload);
    }
 
    public deleteCity(cityId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteCity+'?cityId='+cityId);
    }
    
    public enableDisableAllCityByCountryCode(countryCode:any, enable:any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllCityByCountryCode+'?countryCode='+countryCode+'&enable='+enable);
    }
    
    public enableDisableCity(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableCity, payload);
    }
    
    public findByCityId(ctyId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByCityId+'?ctyId='+ctyId);
    }
    
    public updateCity(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updateCity, payload);
    }
    
    public enableDisableAllCountry(enable: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllCountry+'?enable='+enable);
    }
    
    public findByCountryCode(countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByCountryCode+'?countryCode='+countryCode);
    }

    public enableDisableCountry(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableCountry, payload);
    }

    public fetchAllCountry(): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllCountry);
    }
    
    public fetchAllBankByCountryCode(countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllBankByCountryCode+'?countryCode='+countryCode);
    }
    
    public fetchAllCityByCountryCode(countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllCityByCountryCode+'?countryCode='+countryCode);
    }
        
    public fetchAllWalletsByCountryCode(countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllWalletsByCountryCode+'?countryCode='+countryCode);
    }
    
    public attachMtoBankWithMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.attachMtoBankWithMtoPartner, payload);
    }

    public attachMtoCityWithMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.attachMtoCityWithMtoPartner, payload);
    }
    
    public attachMtoCountryWithMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.attachMtoCountryWithMtoPartner, payload);
    }
    
    public attachMtoWalletWithMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.attachMtoWalletWithMtoPartner, payload);
    }

    public deleteMtoPartner(partnerId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteMtoPartner+'?partnerId='+partnerId);
    }
    
    public deleteMtoCountryLinkMtoPartner(partnerId: any, countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteMtoCountryLinkMtoPartner+'?partnerId='+partnerId+'&countryCode='+countryCode);
    }
    
    public deleteMtoBankLinkMtoPartner(partnerId: any, bankId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteMtoBankLinkMtoPartner+'?partnerId='+partnerId+'&bankId='+bankId);
    }

    public deleteMtoCityLinkMtoPartner(partnerId: any, cityId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteMtoCityLinkMtoPartner+'?partnerId='+partnerId+'&cityId='+cityId);
    }

    public deleteMtoWalletLinkMtoPartner(partnerId: any, walletId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteMtoWalletLinkMtoPartner+'?partnerId='+partnerId+'&walletId='+walletId);
    }
    
    public enableDisableAllMtoPartner(enable: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllMtoPartner+'?enable='+enable);
    }

    public enableDisableMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableMtoPartner, payload);
    }

    public fetchAllMtoPartner(): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllMtoPartner);
    }

    public findByMtoPartnerId(partnerId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByMtoPartnerId+'?partnerId='+partnerId);
    }

    public findMtoCountryByMtoPartnerId(partnerId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findMtoCountryByMtoPartnerId+'?partnerId='+partnerId);
    }

    public findMtoBankByMtoPartnerIdAndMtoCountryCode(partnerId: any, countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findMtoBankByMtoPartnerIdAndMtoCountryCode+'?partnerId='+partnerId+'&countryCode='+countryCode);
    }

    public findMtoCityByMtoPartnerIdAndMtoCountryCode(partnerId: any, countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findMtoCityByMtoPartnerIdAndMtoCountryCode+'?partnerId='+partnerId+'&countryCode='+countryCode);
    }

    public findMtoWalletByMtoPartnerIdAndMtoCountryCode(partnerId: any, countryCode: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findMtoWalletByMtoPartnerIdAndMtoCountryCode+'?partnerId='+partnerId+'&countryCode='+countryCode);
    }

    public updateMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updateMtoPartner, payload);
    }

    public updatePreferenceOrderForMtoPartner(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updatePreferenceOrderForMtoPartner, payload);
    }

    public enableDisableAllProduct(enable: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllProduct+'?enable='+enable);
    }

    public enableDisableProduct(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableProduct, payload);
    }

    public fetchAllProduct(): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchAllProduct);
    }

    public findByProductId(productId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByProductId+'?productId='+productId);
    }

    public updateProduct(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updateProduct, payload);
    }

    public createWallet(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.createWallet, payload);
    }

    public deleteWallet(walletId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteWallet+'?walletId='+walletId);
    }

    public enableDisableAllWalletByCountryCode(countryCode: any, enable: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableAllWalletByCountryCode+'?countryCode='+countryCode+'&enable='+enable);
    }

    public enableDisableWallet(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.enableDisableWallet, payload);
    }

    public findByWalletId(walletId: any): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.findByWalletId+'?walletId='+walletId);
    }

    public updateWallet(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updateWallet, payload);
    }

    public searchCustomerMsisdn(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.searchCustomerMsisdn, payload);
    }

    public createCustomerMsisdn(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.create(environment.createCustomerMsisdn, payload);
    }

    public deletePartnerCustomerMsisdn(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deletePartnerCustomerMsisdn, payload);
    }

    public updatePartnerCustomerMsisdn(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.update(environment.updatePartnerCustomerMsisdn, payload);
    }

    public fetchCustomerMsisdn(pageNumber: number, pageSize: number): Observable<GenericResponse<any>> {
        return this.repositoryService.getData(environment.fetchCustomerMsisdn+'?pageNumber='+pageNumber+'&pageSize='+pageSize);
    }

    public uploadMtoPartnerCustomer(imageDetail: ImageDetail): Observable<GenericResponse<any>> {
        return this.repositoryService.fileUpload(environment.uploadMtoPartnerCustomer, imageDetail);
    }

    public downloadMtoPartnerCustomer(payload: any): Observable<GenericResponse<any>> {
        return this.repositoryService.fileUpload(environment.downloadMtoPartnerCustomer, payload);
    }

    public deleteImageFilename(fileName: any): Observable<GenericResponse<any>> {
        return this.repositoryService.delete(environment.deleteImageFilename+'?fileName='+fileName);
    }

    public resourceUpload(imageDetail: ImageDetail): Observable<GenericResponse<any>> {
        return this.repositoryService.fileUpload(environment.resourceUpload, imageDetail);
    }

}