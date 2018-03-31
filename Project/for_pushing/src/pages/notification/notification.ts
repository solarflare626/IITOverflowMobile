import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
	notifications: any;
  constructor(public navCtrl: NavController, public dataService: NotificationProvider) {
  	this.notifications = this.dataService.listNotifications();
  }

}
