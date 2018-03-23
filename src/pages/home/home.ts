import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  select_categories: any;
  select_sort: any;

  categories: string[] = ['Select category...','Computer Science', 'Biology', 'Chemistry'];
  sort: string[] = ['Sort by...','Newest', 'Oldest', 'Followed'];

  constructor(public navCtrl: NavController) {
    this.select_categories = 'Select category...';
    this.select_sort = 'Sort by...';
  }

}
