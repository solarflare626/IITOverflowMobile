import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  options: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    this.options = {
      placeholderText: "Place Answer Here",
      charCounterCount: false,
      toolbarButtons: ['bold', 'italic', 'underline','|', 'formatOL', 'formatUL','|', 'undo', 'redo','|', 'insertLink'],
      theme: 'red',
      height: 300,
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCommentPage');
    }
    
    postComment() {


      
    }
}
