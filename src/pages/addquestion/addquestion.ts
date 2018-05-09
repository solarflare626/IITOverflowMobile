import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

/**
 * Generated class for the AddquestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addquestion',
  templateUrl: 'addquestion.html',
})
export class AddquestionPage {

  categories: any;
  selected_category: any;
  question: any;
  questiondesc: any;
  user: any;
  new_question: any;
  questions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: NewsfeedProvider) {
    this.user = this.navParams.get("userid");
    this.questions = this.navParams.get("questions");
    this.selected_category = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddquestionPage');
    this.setCategories();
    console.log(this.user);
  }

  setCategories() {
    this.dataService.listCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      err => {
        console.log("ERROR CATEGORIES");
      }
    );
  }

  postQuestion() {
    this.navCtrl.pop();
    this.new_question = {
      "question": this.question, 
      "questiondesc": this.questiondesc,
      "userId": this.user,
      "categoryId": this.selected_category
    };
    console.log(this.new_question);
    let data = JSON.stringify(this.new_question);
    this.dataService.postQuestion(data).subscribe(data =>{
      this.dataService.getQuestion(data.id).subscribe(q =>{
        this.questions.unshift(q);
      });
    });

  }
  showSelectedCategory(c) {
    console.log(this.selected_category);
  }

}

