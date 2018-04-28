import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public storage: Storage) {
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

}
