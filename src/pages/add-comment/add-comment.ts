import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
import { NewsFeedPage } from '../newsfeed/newsfeed';

/**
 * Generated class for the AddCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {
  new_comment: any;
  comment: any;
  user: any;
  answerId: any;
  options: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: NewsfeedProvider) {
    this.options = {
      placeholderText: "Place Comment Here",
      charCounterCount: false,
      toolbarButtons: ['bold', 'italic', 'underline','|', 'formatOL', 'formatUL','|', 'undo', 'redo','|', 'insertLink'],
      theme: 'red',
      height: 300,
    }
    this.answerId = this.navParams.get("answerid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCommentPage');
    }
    
    postComment() {
      this.new_comment = {
        userId: 5, 
        answerId: this.answerId,
        comment: this.comment,
      };
      console.log("Comment: ",this.new_comment);
      let data = JSON.stringify(this.new_comment);
      console.log("Comment: ",this.new_comment);
      this.dataService.postComment(data).subscribe(data =>{
          console.log(data);
        });
      this.comment = ""; 
      this.navCtrl.pop();
    }
}
