import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
import { UserProvider } from '../../providers/user/user';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {
	
  searchControl: FormControl;
  title: String;
  question: String;
  categories: any;
  tags: any;
  poster: any;
  dateposted: any;
  followed: boolean;
  searchTerm: string = '';
  select_tags: any;
  selected_category: any;
  new_post: any;
  new_answer: any;
  new_comment: any;
  user :any;
  option: boolean; // if question_post == false, it means the page 'question' should display the details of a question
  selected_question_id: any;
  selected_question: any;
  selected_answer: any;
  viewCommentBar: boolean = false;
  viewAnswerBar: boolean = false;
  viewAnswerActionBar: boolean = false;
  comment: String;
  answer: String;
  answers: any;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public dataService: NewsfeedProvider,
      private userProvider:UserProvider,
      public toastCtrl: ToastController) {
      this.option = this.navParams.get('option');
      this.selected_question = this.navParams.get('question');
      this.selected_question_id = this.selected_question.id;
      this.select_tags = [];
      this.searchControl = new FormControl();
      this.selected_category = "Select category...";
      this.userProvider.get().then(data => {
        if(data){
          console.log("Found user in starage question: ", data);
          this.user = JSON.parse(data);
          console.log("user id: ", this.user.id);

          }else{
            console.log("No saved user");
          }

      }).catch(error =>{
        console.error
      });
    }
//////////////////////////////////////////////////////////////// -> onload
  ionViewDidLoad() {
    this.setAnswers();
    this.setCategories();
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredItems();
    });
    this.checkFollowStatus();
  }

  setAnswers() {
    return this.dataService.getSpecificQuestionAnswers(this.selected_question_id).subscribe(
      data => {
        console.log("ANSWERS: ", data);
        this.answers = data;
      },
      err => {
        console.log("ERROR SQA");
      }
    );
  }

  setCategories() {
    this.dataService.listCategories().subscribe(data => {
        this.categories = data;
      }, err => {
        console.log("ERROR C");
      });
  }
  
  setFilteredItems() {
      this.tags = this.dataService.filterTags(this.searchTerm);
  }
//////////////////////////////////////////////////////////////// -> tag functions
  addTags(tag) {
    this.select_tags.push(tag);
    this.searchTerm = '';
  }

  removeTags(tag) {
    let index: number = this.select_tags.indexOf(tag);
    if (index > -1) {
      this.select_tags.splice(index, 1);
    }
  }
//////////////////////////////////////////////////////////////// -> follow/unfollow functions

  checkFollowStatus() {
    this.dataService
      .followStatus(4, this.selected_question_id)
      .subscribe(
        data => {
          this.followed = true;
          console.log("FOLLOWED");
        },
        err => {
          this.followed = false;
          console.log("NOT FOLLOWED");
          
          
        }
      );
  }
  followQuestion() {
    //this.dataService.followQuestion(this.user, this.selected_question);
    //console.log("ME FOLLOW QUESTION");
    let put= JSON.stringify({
      "questionId": this.selected_question_id,
      "userId": 4
    });
    this.followed = true;
    this.dataService.followQuestion(4, this.selected_question_id, put);
    this.checkFollowStatus();
    this.toastCtrl.create({message:'Question Followed', position: 'bottom', duration: 3000}).present();
  }

  unfollowQuestion() {
    //console.log("ME UNFOLLOW QUESTION");
    this.dataService.unfollowQuestion(4, this.selected_question_id);
    this.followed = false;
    this.checkFollowStatus();
    this.toastCtrl.create({message:'Question Unfollowed', position: 'bottom', duration: 3000}).present();
  }
//////////////////////////////////////////////////////////////// -> post/edit/delete comment functions
  showHideCommentBar() {
    this.viewCommentBar = !(this.viewCommentBar);
    if (this.viewAnswerBar)
      this.viewAnswerBar = !(this.viewAnswerBar);
  }

  postComment() {
    console.log("Comment: ", this.comment);
    this.viewCommentBar = false;
    this.comment = '';
  }
//////////////////////////////////////////////////////////////// -> post/edit/delete answer functions
  showHideAnswerBar() {
    this.viewAnswerBar = !(this.viewAnswerBar);
    if (this.viewCommentBar)
      this.viewCommentBar = !(this.viewCommentBar);
  }

  showHideAnswerActionBar(answer_id) {
    this.viewAnswerActionBar = !(this.viewAnswerActionBar);
    this.selected_answer = answer_id;
  }

  postAnswer() {
    this.new_answer = {
      userId: 4, 
      questionId: this.selected_question.id,
      answer: this.answer
    };
    let data = JSON.stringify(this.new_answer);
    this.dataService.postAnswer(data).subscribe(data=>{
      this.setAnswers();
      
    });
    this.viewAnswerBar = false;
    this.answer = ""; 
    
    
  }

  deleteAnswer(answer_id) {
    this.dataService.deleteAnswer(answer_id).subscribe(data =>{
      this.setAnswers();
    }
    );
    
  }
//////////////////////////////////////////////////////////////// -> post/edit/delete question functions
  postQuestion() {
    this.navCtrl.pop();
    console.log(this.user.id);
    this.new_post = {
      userId: this.user.id,
      question: this.title,
      questiondesc: this.question,
      //'categories': this.select_categories,
      //'tags': this.select_tags
    };
    let data = JSON.stringify(this.new_post)
    this.dataService.postQuestion(data);
    
  }

}
