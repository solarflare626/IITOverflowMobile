import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
import { QuestionPage } from '../../pages/question/question';
import {AddquestionPage } from '../../pages/addquestion/addquestion';
import { Http } from '@angular/http';
import { GLOBALS } from '../../models/globals';
import {NativeApiProvider} from '../../nativeProviders/nativeApi/nativeApi';
import {NativeUserProvider} from '../../nativeProviders/nativeUser/nativeUser';
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
    public appCtrl: App,
    private userProvider : NativeUserProvider
  ) {
      this.select_categories = 'Select category...';
      this.select_sort = 'Sort by...';
      /*this.user = {
        "email": "chrisjabel11@gmail.com",
        "displayname": "Christine Beleta",
        "picture": "https://lh5.googleusercontent.com/-EiereXA5ywg/AAAAAAAAAAI/AAAAAAAAAAA/ACLGyWBD2Ch2uvojXnwMvIPaZhMMW2yWBg/s96-c/photo.jpg",
        "createdAt": "2018-05-02T06:18:44.131Z",
        "updatedAt": "2018-05-02T06:18:44.123Z",
        "deletedAt": null,
        "id": 8
      };*/
      this
      .userProvider
      .get()
      .then(data => {
        if (data) {
          this.user = data;
          console.log("curruser", this.user.id);
        }else{
          this
        }
      })
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
    this.navCtrl.push(AddquestionPage, {userid: this.user.id,questions: this.questions});
  }

  viewQuestion(question) {
    this.appCtrl.getRootNav().push(this.questionpage, {option: false, question: question, questions: this.questions});
 
    //this.navCtrl.push(this.questionpage, {option: false, question: question});
  }

  getDate(date){

    var date2 = new Date().getTime() - new Date(date).getTime();
    
    var seconds = Math.floor( date2 / 1000);

    if(Math.floor(seconds / 3600) >= 24)
      return new Date(date).toUTCString().slice(0,-10);

    if(Math.floor(seconds / 3600))
      return  ""+Math.floor(seconds / 3600)+" hours ago";

    if(Math.floor(seconds / 60))
        return  ""+Math.floor(seconds / 60)+" minutes ago";
    
    if(Math.floor(seconds / 1))
        return  ""+Math.floor(seconds / 1)+" seconds ago";
    
    
        return new Date(date).toUTCString().slice(0,-10);
    
  
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
