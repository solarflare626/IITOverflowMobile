import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-question',
  templateUrl: 'edit-question.html',
})
export class EditQuestionPage {

  options: any;
  questionHead: string;
  questionDesc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.questionHead = this.navParams.get('question1');
    this.questionDesc = this.navParams.get('question2');
    // console.log(questionHead);
    // console.log(this.questionDesc);
    this.options = {
      placeholderText: this.questionDesc,
      charCounterCount: false,
      toolbarButtons: ['bold', 'italic', 'underline','|', 'formatOL', 'formatUL','|', 'undo', 'redo','|', 'insertLink'],
      theme: 'red',
      height: 300,
      value: this.questionDesc
    }
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditQuestionPage');
  }

}
