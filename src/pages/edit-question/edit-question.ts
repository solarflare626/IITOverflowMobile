import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
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
  question: any;
  title: any;
  desc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: NewsfeedProvider) {
    this.question = this.navParams.get('question');
    // console.log(questionHead);
    // console.log(this.questionDesc);
    this.options = {
      placeholderText: this.question.question,
      charCounterCount: false,
      toolbarButtons: ['bold', 'italic', 'underline','|', 'formatOL', 'formatUL','|', 'undo', 'redo','|', 'insertLink'],
      theme: 'red',
      height: 300,
      value: this.question.questiondesc
    }
 
  }
  ionViewDidLoad() {
  }

  editQuestion() {
    let data = {
      "question": this.title,
      "questiondesc": this.desc,
    };
    this.dataService.editQuestion(this.question.id, data).subscribe(
      data => {
        console.log("Edited Question");
        this.navCtrl.pop();
      }
    );
  }

}
