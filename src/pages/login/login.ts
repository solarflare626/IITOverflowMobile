import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HTTP } from '@ionic-native/http';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../../pages/home/home';

import { GLOBALS } from '../../models/globals';

export class User{
   id: number;
   displayname: string;
   createdAt: string;
   updatedAt: string;
   deletedAt: string;
   email:  string;
   pricture:  string;
   constructor(values: Object = {}) {
        Object.assign(this, values);
   }
} 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  accessToken: string;
  user:User;
  globals = new GLOBALS();
  isLoggedIn:boolean = false;
  constructor(public navCtrl: NavController,public googlePlus: GooglePlus, private http: HTTP, private userProvider:UserProvider) {
  		//this.userProvider.delete();  //remove this to remove auto login. deletes data in local storage

  		
  		this.userProvider.get().then(data => {

  			if(data){
	  			console.log("Found user in starage: ", data);
	  			this.isLoggedIn= true;
	  			this.navCtrl.setRoot(HomePage) // login if has credentials stored in storage

	  			}else{
	  				console.log("No saved user");
	  			}

  		}).catch(error =>{
  			console.error
  		});
  			
  		
  }
  login() {
  	// include webClientId to include idToken in results. Set to client Id of loopback / web in google credentials
    this.googlePlus.login({'webClientId':'976545483152-vsg906t0vnk04b5gra3861c98jqi7hcq.apps.googleusercontent.com','offline': true})
      .then(res => {
       
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        console.log(JSON.stringify(res));
        console.log(this.globals.baseUrl);
        this.http.post(this.globals.baseUrl+'/users/OAuthLogin', {"idToken":res.idToken}, {})
        .then(data  => {
            //data = data.data;
            console.log(data.data);
            this.userId = data.data.userId;
            this.accessToken = data.data.id;
            this.isLoggedIn = true;

            this.http.get(this.globals.baseUrl+'/users/'+this.userId,{},{}).then(resp=>{
            this.user = resp.data;

            this.userProvider.set(resp.data);
            console.log("User: ",resp.data);
            this.navCtrl.setRoot(HomePage)
            }).catch(error => {

            console.log("hahaha2",error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);

          });
        })
        .catch(error => {

          console.log("hahaha",error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });

       


      
      })
      .catch(err => alert(err));
  }

  logout() {

  this.userProvider.delete();
   this.isLoggedIn = false;

    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";
        
      }).catch(err => console.error(err));
  }


}
