import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  new_answer: any;
  selected_question_id1: any;
  selected_question: any;
  selected_answer: any;
  answer: String;
  answers: any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataService: NewsfeedProvider,) {
      this.selected_question_id1 = this.navParams.get("questionId");
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    console.log(this.selected_question_id1);
  }

  postAnswer(){
    this.new_answer = {
      userId: 4, 
      questionId: this.selected_question_id1,
      answer: this.answer
    };
    let data = JSON.stringify(this.new_answer);
    this.dataService.postAnswer(data).subscribe(data=>{
      this.setAnswers();
      
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
