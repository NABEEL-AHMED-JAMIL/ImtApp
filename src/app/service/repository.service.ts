import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ImageDetail } from '../model/imageDetail';
 
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
 
  constructor(private http: HttpClient) { }
 
  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  public create = (route: string, body?: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
 
  public update = (route: string, body?: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
 
  public delete = (route: string, body?: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public fileUpload = (route: string, body?: ImageDetail) => {
    const formData:FormData = new FormData();
    if (body.file) {
      formData.append('file',body.file, body.name);
    }
    if (body.folderName) {
      formData.append('folderName', body.folderName);
    }
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), formData);
  }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
