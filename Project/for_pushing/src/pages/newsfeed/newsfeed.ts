import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html'
})
export class NewsFeedPage {
  select_categories: any;
  select_sort: any;
  questions: any;
  
  categories: string[] = ['Select category...','Computer Science', 'Biology', 'Chemistry'];
  sort: string[] = ['Sort by...','Newest', 'Oldest', 'Followed'];

  constructor(public navCtrl: NavController, public dataService: NewsfeedProvider) {
    this.select_categories = 'Select category...';
    this.select_sort = 'Sort by...';
    this.questions = this.dataService.listQuestions();
  }

}
