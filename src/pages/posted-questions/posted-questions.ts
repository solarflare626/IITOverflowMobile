import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../../pages/question/question';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

/**
 * Generated class for the PostedQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posted-questions',
  templateUrl: 'posted-questions.html',
})
export class PostedQuestionsPage {
	user: any;
	postedQuestions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: NewsfeedProvider) {
	this.user = this.navParams.get("curuser");
  }

  ionViewDidLoad() {
    this.setPostedQuestions();
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

  setPostedQuestions() {
	this.dataService.listPostedQuestions(this.user.id).subscribe(
		data => {
			this.postedQuestions = data;
		}
	);
}

viewQuestion(question) {
  //this.appCtrl.getRootNav().push(QuestionPage, {option: false, question: question, questions: this.posts});
  this.navCtrl.push(QuestionPage, {option: false, question: question, questions: this.postedQuestions});
  //this.navCtrl.push(this.questionpage, {option: false, question: question});
}

}
