import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostQuestionPage } from '../post_question/post_question';


@Component({
  selector: 'page-qanda',
  templateUrl: 'qanda.html'
})
export class QandaPage {
	postQuestionPage = PostQuestionPage
  constructor(public navCtrl: NavController) {

  } 
}