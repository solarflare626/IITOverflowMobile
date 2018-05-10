import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NativeApiProvider {
  // baseUrl = 'http://192.168.43.72:3000/api'
  public baseUrl = 'http://iitoverflow.herokuapp.com/api';
  constructor(public http: HTTP) {
    // console.log('Hello ApiProvider Provider');
  }

 public post(url: string, params: any = {}, headers: any = {}) {
    return this.http.post(this.baseUrl + url, params, headers);

  } 
  public patch(url: string, params: any = {}, headers: any = {}) {
    return this.http.patch(this.baseUrl + url, params, headers);

  } 

  public delete(url: string, params: any = {}, headers: any = {}) {
    return this.http.delete(this.baseUrl + url, params, headers);

  } 

  public get(url: string, params: any = {}, headers: any = {}) {
    return this.http.get(this.baseUrl + url, params, headers).then((data) => {
      return data;
    }
    ).catch((error) => {
      return error;
    });

  } 


}
