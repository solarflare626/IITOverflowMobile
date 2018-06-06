import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
/**
 * Generated class for the AddAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-answer',
  templateUrl: 'add-answer.html',
})
export class AddAnswerPage {
  new_answer: any;
  selected_question_id1: any;
  selected_question: any;
  selected_answer: any;
  answer: any;
  answers: any;
  options: any;
  questionpage: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService: NewsfeedProvider) {
    this.options = {
      placeholderText: "Place Answer Here",
      charCounterCount: false,
      toolbarButtons: ['bold', 'italic', 'underline','|', 'formatOL', 'formatUL','|', 'undo', 'redo','|', 'insertLink'],
      theme: 'red',
      height: 300,
    }
    this.selected_question_id1 = this.navParams.get("questionId");
    this.questionpage = this.navParams.get('questionpage');
    console.log(this.selected_question_id1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAnswerPage');
  }

  
  postAnswer(){
    this.new_answer = {
      userId: 5, 
      questionId: this.selected_question_id1,
      answer: this.answer,
    };
    console.log("Answer: ",this.new_answer);
    let data = JSON.stringify(this.new_answer);
    this.dataService.postAnswer(data).subscribe(data =>{
        console.log(data);
        this.questionpage.setAnswers();
      });
    this.answer = ""; 
    this.navCtrl.pop();
  }

  setAnswers() {
    return this.dataService.getSpecificQuestionAnswers(this.selected_question_id1).subscribe(
      data => {
        console.log("ANSWERS: ", data);
        this.answers = data;
      },
      err => {
        console.log("ERROR SQAOTIIII");
      }
    );
  }

}
