import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { timer } from 'rxjs/observable/timer';
import { IntroPage } from '../pages/intro/intro';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
  showSplash = true;
  loader: any;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
  public storage: Storage) {

    // this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      // this.storage.get('introShown').then((result) => {
 
      //   if(result){
      //     this.rootPage = IntroPage;
      //   } else {
      //     this.rootPage = HomePage;
      //     this.storage.set('introShown', true);
      //   }
 
      //   this.loader.dismiss();s
 
      // });
      statusBar.backgroundColorByHexString('#ffffff');
      // statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }


    // presentLoading() {
 
  //   this.loader = this.loadingCtrl.create({
  //     content: "Authenticating..."
  //   });
 
  //   this.loader.present();
 
  // }
  // let status bar overlay webview

}

