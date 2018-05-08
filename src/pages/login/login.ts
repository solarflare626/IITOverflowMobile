import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../../pages/tabs/tabs';

import { GLOBALS } from '../../models/globals';
// Ionic -Angular
import { NavController, 
  AlertController,
  ToastController, 
  LoadingController} from 'ionic-angular';

// Native Components
import { GooglePlus } from '@ionic-native/google-plus';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
  providers: [GooglePlus]
})

export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  globals = new GLOBALS();
  isLoggedIn:boolean = false;
  user:User;
  imageURI: any;
  imageFileName: any;
  accessToken: string;

  constructor(public navCtrl: NavController,
    private googlePlus: GooglePlus, 
    private alertCtrl: AlertController,
    private transfer: FileTransfer,
    private camera: Camera,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private http: HTTP, private userProvider:UserProvider) {

      this.userProvider.get().then(data => {

  			if(data){
	  			console.log("Found user in starage: ", data);
	  			this.isLoggedIn= true;
	  			this.navCtrl.setRoot(TabsPage) // login if has credentials stored in storage

	  			}else{
	  				console.log("No saved user");
	  			}

  		}).catch(error =>{
  			console.error
  		});


    
  }
  login() {
    this.googlePlus.login({'webClientId':'976545483152-vsg906t0vnk04b5gra3861c98jqi7hcq.apps.googleusercontent.com','offline': true})
      .then(res => {
        console.log(res);
        
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
            //data = JSON.parse(data.data);
            let d = JSON.parse(data.data);
            console.log("hahaha",d);
            this.userId = d.userId;
            this.accessToken = d.id;
            
            console.log("data",d.userId);
            this.http.get(this.globals.baseUrl+'/users/'+this.userId,{},{}).then(resp=>{
            this.user = resp.data;

            this.userProvider.set(resp.data);
            console.log("User: ",resp.data);
            this.navCtrl.setRoot(TabsPage);
            this.isLoggedIn = true;
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
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";
        this.isLoggedIn = false;
        this.userProvider.delete();
      })
      .catch(err => console.error(err));
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Do not Leave Please?',
      message: 'Are you sure you to want Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Logout');
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }
  
  uploadFile1() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  

}
