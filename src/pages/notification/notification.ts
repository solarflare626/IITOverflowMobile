import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  globals:any;
	notifications: any;
  constructor(private navParams: NavParams,public navCtrl: NavController, public dataService: NotificationProvider) {
    this.globals = this.navParams.get('globals');

  
    
  }

  getDate(date) {

    var date2 = new Date().getTime() - new Date(date).getTime();
  
    var seconds = Math.floor(date2 / 1000);
  
    if (Math.floor(seconds / 3600) >= 24)
        return new Date(date).toUTCString();
  
    if (Math.floor(seconds / 3600))
        return "" + Math.floor(seconds / 3600) + " hours ago";
  
    if (Math.floor(seconds / 60))
        return "" + Math.floor(seconds / 60) + " minutes ago";
  
    if (Math.floor(seconds / 1))
        return "" + Math.floor(seconds / 1) + " seconds ago";
  
    return "Just now";
  
  
  
  }
  ionSelected(){
    this.globals.hold.notif = 0;
}
ionViewDidLoad() {
  this.globals.hold.notif = 0;
  
}
  

}
