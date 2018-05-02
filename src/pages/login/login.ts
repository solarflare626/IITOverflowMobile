import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeUserProvider } from '../../nativeProviders/nativeUser/nativeUser';
import { NativeApiProvider } from '../../nativeProviders/nativeApi/nativeApi';
import { TabsPage } from '../../pages/tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
//import { HTTP } from '@ionic-native/http';

//import { ProfilePage } from '../../pages/profile/profile';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: NativeUserProvider,
    private googlePlus: GooglePlus,
    private api: NativeApiProvider,
    //private http: HTTP
  ) {

    this.userProvider.get().then(
      data =>{
        if(data)
          this.navCtrl.setRoot(TabsPage);
      }
    )
      
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.googlePlus.login({ 'webClientId': '976545483152-vsg906t0vnk04b5gra3861c98jqi7hcq.apps.googleusercontent.com', 'offline': true })
      .then(res => {
        //console.log(res);

        this.api.post('/users/OAuthLogin', { "idToken": res.idToken }, {}).then(data => {
          //data = JSON.parse(data.data);
          var data2 = JSON.parse(data.data);

          var accessToken = data2.id;
          var user;
          //console.log("data", data.userId);
          this.api.get('/users/' + data2.userId, {}, {}).then(resp => {
            user = JSON.parse(resp.data);
            user.accessToken = accessToken;
            //console.log("idtoken", JSON.stringify(data));

            this.userProvider.set(user);
            //console.log("User: ", JSON.stringify(user));
            this.navCtrl.setRoot(TabsPage);
          }).catch(error => {

            //console.log("hahaha2", error.status);
            //console.log(error.error); // error message as string
           // console.log(error.headers);

          });
        })
          .catch(error => {

            //console.log("hahaha", error.status);
           // console.log(error.error); // error message as string
            //console.log(error.headers);

          });





      })
      .catch(err => alert(err));

  }


}
