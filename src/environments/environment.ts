// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// ionic serve --lab use to to run the app
export const environment = {
  production: false,
  urlAddress: 'http://localhost:9098/api/v1',
  createBank: '/imrh/bank/createBank',
  deleteBank: '/imrh/bank/deleteBank',
  enableDisableAllBankByCountryCode: '/imrh/bank/enableDisableAllBankByCountryCode',
  enableDisableBank: '/imrh/bank/enableDisableBank',
  findByBankId: '/imrh/bank/findByBankId',
  updateBank: '/imrh/bank/updateBank',
  createCity: '/imrh/city/createCity',
  deleteCity: '/imrh/city/deleteCity',
  enableDisableAllCityByCountryCode: '/imrh/city/enableDisableAllCityByCountryCode',
  enableDisableCity: '/imrh/city/enableDisableCity',
  findByCityId: '/imrh/city/findByCityId',
  updateCity: '/imrh/city/updateCity',
  enableDisableAllCountry: '/imrh/country/enableDisableAllCountry',
  enableDisableCountry: '/imrh/country/enableDisableCountry',
  findByCountryCode: '/imrh/country/findByCountryCode',
  fetchAllBankByCountryCode: '/imrh/country/fetchAllBankByCountryCode',
  fetchAllCityByCountryCode: '/imrh/country/fetchAllCityByCountryCode',
  fetchAllCountry: '/imrh/country/fetchAllCountry',
  fetchAllWalletsByCountryCode: '/imrh/country/fetchAllWalletsByCountryCode',
  attachMtoBankWithMtoPartner: '/imrh/partner/attachMtoBankWithMtoPartner',
  attachMtoCityWithMtoPartner: '/imrh/partner/attachMtoCityWithMtoPartner',
  attachMtoCountryWithMtoPartner: '/imrh/partner/attachMtoCountryWithMtoPartner',
  attachMtoWalletWithMtoPartner: '/imrh/partner/attachMtoWalletWithMtoPartner',
  deleteMtoBankLinkMtoPartner: '/imrh/partner/deleteMtoBankLinkMtoPartner',
  deleteMtoCityLinkMtoPartner: '/imrh/partner/deleteMtoCityLinkMtoPartner',
  deleteMtoCountryLinkMtoPartner: '/imrh/partner/deleteMtoCountryLinkMtoPartner',
  deleteMtoPartner: '/imrh/partner/deleteMtoPartner',
  deleteMtoWalletLinkMtoPartner: '/imrh/partner/deleteMtoWalletLinkMtoPartner',
  enableDisableAllMtoPartner: '/imrh/partner/enableDisableAllMtoPartner',
  enableDisableMtoPartner: '/imrh/partner/enableDisableMtoPartner',
  fetchAllMtoPartner: '/imrh/partner/fetchAllMtoPartner',
  findByMtoPartnerId: '/imrh/partner/findByMtoPartnerId',
  findMtoBankByMtoPartnerIdAndMtoCountryCode: '/imrh/partner/findMtoBankByMtoPartnerIdAndMtoCountryCode',
  findMtoCityByMtoPartnerIdAndMtoCountryCode: '/imrh/partner/findMtoCityByMtoPartnerIdAndMtoCountryCode',
  findMtoCountryByMtoPartnerId: '/imrh/partner/findMtoCountryByMtoPartnerId',
  findMtoWalletByMtoPartnerIdAndMtoCountryCode: '/imrh/partner/findMtoWalletByMtoPartnerIdAndMtoCountryCode',
  updateMtoPartner: '/imrh/partner/updateMtoPartner',
  updatePreferenceOrderForMtoPartner: '/imrh/partner/updatePreferenceOrderForMtoPartner',
  enableDisableAllProduct: '/imrh/product/enableDisableAllProduct',
  enableDisableProduct: '/imrh/product/enableDisableProduct',
  fetchAllProduct: '/imrh/product/fetchAllProduct',
  findByProductId: '/imrh/product/findByProductId',
  updateProduct: '/imrh/product/updateProduct',
  createWallet: '/imrh/wallet/createWallet',
  deleteWallet: '/imrh/wallet/deleteWallet',
  enableDisableAllWalletByCountryCode: '/imrh/wallet/enableDisableAllWalletByCountryCode',
  enableDisableWallet: '/imrh/wallet/enableDisableWallet',
  findByWalletId: '/imrh/wallet/findByWalletId',
  updateWallet: '/imrh/wallet/updateWallet',
  createCustomerMsisdn: '/imrh/partnerCustomer/createCustomerMsisdn',  
  deletePartnerCustomerMsisdn: '/imrh/partnerCustomer/deletePartnerCustomerMsisdn',
  downloadMtoPartnerCustomer: '/imrh/partnerCustomer/downloadMtoPartnerCustomer',  
  searchCustomerMsisdn: '/imrh/partnerCustomer/searchCustomerMsisdn',
  fetchCustomerMsisdn: '/imrh/partnerCustomer/fetchCustomerMsisdn',
  updatePartnerCustomerMsisdn: '/imrh/partnerCustomer/updatePartnerCustomerMsisdn',  
  uploadMtoPartnerCustomer: '/imrh/partnerCustomer/uploadMtoPartnerCustomer',
  deleteImageFilename: '/imrh/resource/delete/image/file-name',
  download: '/imrh/resource/download/image/file-name',
  resourceUpload: '/imrh/resource/uploadFile'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
