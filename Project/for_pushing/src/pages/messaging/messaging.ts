import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { MessagingProvider } from '../../providers/messaging/messaging';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html'
})
export class MessagingPage {
	tab: any;
	searchTerm: string = '';
	searchControl: FormControl;
	convos: any;
	contacts: any;
	searching: any = false;
  select_convo: any;
  select_contact: any;

  constructor(public navCtrl: NavController, public dataService: MessagingProvider) {
  	this.tab = 'convo';
  	this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
  	this.setFilteredItems();
  	this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
  		this.setFilteredItems();
  	});
  }

  setFilteredItems() {
  		this.convos = this.dataService.filterConvos(this.searchTerm);	
  		this.contacts = this.dataService.filterContacts(this.searchTerm);
  }

}
