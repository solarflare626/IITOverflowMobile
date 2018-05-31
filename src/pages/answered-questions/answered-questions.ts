import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

/**
 * Generated class for the AnsweredQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answered-questions',
  templateUrl: 'answered-questions.html',
})
export class AnsweredQuestionsPage {

	user: any;
	answeredQuestions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: NewsfeedProvider) {
	this.user = this.navParams.get("curuser");
  }

  // ionViewDidLoad() {
  //   this.setAnsweredQuestions();
  // }

  // setAnsweredQuestions() {
  // 	this.dataService.listAnsweredQuestions(this.user.id).subscribe(
	// 	data => {
	// 		this.answeredQuestions = data;
	// 	}
	// );
  // }

}
