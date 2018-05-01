import { App } from 'ionic-angular';
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
  questionpage = QuestionPage;
  categories: any;
  sort: string[] = ['Sort by...', 'Newest', 'Oldest', 'Followed', 'Unanswered'];

  constructor(public navCtrl: NavController, 
    public dataService: NewsfeedProvider, 
    public http: Http,
    public appCtrl: App
  ) {
      this.select_categories = 'Select category...';
      this.select_sort = 'Sort by...';
      this.user = {"id": 9,  "displayname": "Hokage", "picture": "random"};
    //this.reload();
    
  }
//////////////////////////////////////////////////////////////// -> onload
  ionViewDidLoad() {
    this.dataService.listQuestions().subscribe(
        data => {
          this.questions = data;
          console.log(this.questions);
        },
        err => {
          console.log("ERROR Q");
        });
         
    this.dataService.listCategories().subscribe(
      data =>{
        this.categories = data;
      },
      err => {
        console.log("ERROR C");
      });
  }
//////////////////////////////////////////////////////////////// -> question functions
  postQuestion() {
    this.navCtrl.push(this.questionpage, {option: true});
  }

  viewQuestion(question) {
    this.appCtrl.getRootNav().push(this.questionpage, {option: false, question: question});
 
    //this.navCtrl.push(this.questionpage, {option: false, question: question});
  }

  getDate(date){

    date = new Date().getTime() - new Date(date).getTime();
    
    var seconds = Math.floor( date / 1000);

    if(Math.floor(seconds / 3600) >= 24)
      return date.toUTCString();

    if(Math.floor(seconds / 3600))
      return  ""+Math.floor(seconds / 3600)+" hours ago";

    if(Math.floor(seconds / 60))
        return  ""+Math.floor(seconds / 60)+" minutes ago";
    
    if(Math.floor(seconds / 1))
        return  ""+Math.floor(seconds / 1)+" seconds ago";
    
    
    return date.toUTCString();
    
      
  
  }
  /*
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
  */

}
