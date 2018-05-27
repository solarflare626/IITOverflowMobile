import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../models/globals';
import { BaseInput } from 'ionic-angular/util/base-input';
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

  questionsCount(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/questions/count').map(res => res.json());
  }

  listFollowers(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/followers').map(res => res.json());
  }

  followersCount(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/followers/count').map(res => res.json());
  }

  listFollowing(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/following').map(res =>res.json());
  }

  followingCount(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/following/count').map(res => res.json());
  }

  listInterests(user_id) {
    return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/interests').map(res => res.json());
  }

  checkFollowStatus(user_id, userid) {
    return this.http.head(this.globals.baseUrl+'/api/users/'+user_id+'/following/rel/'+userid);
  }

  followUser(user_id, userid) {
    let data = {
      "user_id": user_id,
      "userid": userid
    }
    JSON.stringify(data);
    return this.http.put(this.globals.baseUrl+'/api/users/'+user_id+'/following/rel/'+userid, data).map(res => res.json());
  }

  unfollowUser(user_id, userid) {
    return this.http.delete(this.globals.baseUrl+'/api/users/'+user_id+'/following/rel/'+userid).map(res => res.json());
  }


}
