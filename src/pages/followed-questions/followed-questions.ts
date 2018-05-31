import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../../pages/question/question';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

/**
 * Generated class for the FollowedQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followed-questions',
  templateUrl: 'followed-questions.html',
})
export class FollowedQuestionsPage {
	user: any;
	followedQuestions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: NewsfeedProvider) {
	this.user = this.navParams.get("curuser");
  }

  ionViewDidLoad() {
    this.setFollowedQuestions();
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

  setFollowedQuestions() {
	this.dataService.listFollowedQuestions(this.user.id).subscribe(
		data => {
			this.followedQuestions = data;
		}
	);
}

viewQuestion(question) {
  //this.appCtrl.getRootNav().push(QuestionPage, {option: false, question: question, questions: this.posts});
  this.navCtrl.push(QuestionPage, {option: false, question: question, questions: this.followedQuestions});
  //this.navCtrl.push(this.questionpage, {option: false, question: question});
}

}
