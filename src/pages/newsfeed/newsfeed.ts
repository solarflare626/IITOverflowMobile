import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
import { QuestionPage } from '../../pages/question/question';
import { Http } from '@angular/http';
import { GLOBALS } from '../../models/globals';
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html'
})
export class NewsFeedPage {
  select_categories: any;
  select_sort: any;
  questions: any;
  user : any;
  globals= new GLOBALS();
  postquestion = QuestionPage;
  
  categories: string[] = ['Select category...','Computer Science', 'Biology', 'Chemistry'];
  sort: string[] = ['Sort by...','Newest', 'Oldest', 'Followed', 'Unanswered'];

  constructor(public navCtrl: NavController, public dataService: NewsfeedProvider, public http: Http) {
    this.select_categories = 'Select category...';
    this.select_sort = 'Sort by...';
    
    this.reload();
      
  }
   reload(){

    this.http.get(this.globals.baseUrl+'/Questions?filter[include]=user&filter[order]=updatedAt DESC').map(res => res.json()).subscribe(
      data => {
         
        this.questions = data;
          console.log(JSON.stringify(this.questions));
      },
      err => {
         // console.log('Banga!');
         console.log(JSON.stringify(err));
      }
  );

   }
  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      //console.log('Async operation has ended');
      this.questions = [];
      this.reload();

      refresher.complete();
    }, 2000);
  }

}
