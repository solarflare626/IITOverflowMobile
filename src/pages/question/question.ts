import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
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
  searchTerm: string = '';
  select_tags: any;
  select_categories: any = ['Random', 'Noob'];
  new_post: any;
  user :any;
  constructor(public navCtrl: NavController, public dataService: NewsfeedProvider,private userProvider:UserProvider) {
  	this.select_tags = [];
    this.searchControl = new FormControl();
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

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredItems();
    });
  }

  setFilteredItems() {
      this.tags = this.dataService.filterTags(this.searchTerm);
  }

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

  submit() {
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
