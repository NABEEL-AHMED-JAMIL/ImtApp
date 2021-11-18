import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor() { }

  public getCurrentUser(): any {
      return {
          token: "sdflusidfuslj23sfsd"
      }
  }
 
}
