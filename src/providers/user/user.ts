import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../models/globals';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  globals = new GLOBALS();
  constructor(public storage: Storage, public http: Http) {
     /*this.storage.get('user').then((val) => {
	    console.log('User init:',JSON.stringify(JSON.parse(val)));
	 });*/
  }

  public get(){
  	return this.storage.get('user').then(val => {
    	return JSON.parse(val);
  	});
  }

  public set(data: any ={}){
  	this.storage.set('user', JSON.stringify(data));
    console.log("set user to", JSON.stringify(data));


  }
  public delete(){
    this.storage.remove('user');
    console.log("deleted");
  }

  listQuestions(user_id) {
    return this.http
      .get(
        this.globals.baseUrl + 
          //'/api/Questions?filter={"include":[{"relation":"answers","scope":{"include":"user"}},{"relation":"category"},{"relation":"user"}]}'
          '/api/Questions?filter[where][userId]=' + user_id
      )
      .map(res => res.json());
  }

}
