
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  
  
  constructor() {
    //console.log('Hello ApiProvider Provider');
  }

   static baseUrl() {
      //return 'http://192.168.0.118:3000/api';
      return 'http://192.168.43.72:3000/api';
      
         
    }

}
