import {Component,ViewChild,Renderer,ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {NewsfeedProvider} from '../../providers/newsfeed/newsfeed';
//import { UserProvider } from '../../providers/user/user';
import 'rxjs/add/operator/debounceTime';
import {ActionSheetController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {NativeUserProvider} from '../../nativeProviders/nativeUser/nativeUser';
import {NativeApiProvider} from '../../nativeProviders/nativeApi/nativeApi';

import { Autosize} from '../../components/autosize/autosize';
@Component({selector: 'page-question', templateUrl: 'question.html'})
export class QuestionPage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('mynputParent') myInputParent:   ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
     
      console.log('scrollheight',element.scrollHeight);
      console.log('height',element.style.height);
      var scrollHeight = element.scrollHeight;
    if(scrollHeight+10 < 120){
      
      
      element.style.height = scrollHeight + 'px';
      //scrollHeight= element.height;
      
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 10) + 'px';
      this.myInputParent['_elementRef'].nativeElement.style.height = (scrollHeight + 40) + 'px';
    }
  }
  input : any = {};
  searchControl : FormControl;
  title : String;
  question : String;
  categories : any;
  tags : any;
  poster : any;
  dateposted : any;
  followed : boolean;
  searchTerm : string = '';
  select_tags : any;
  selected_category : any;
  new_post : any;
  new_answer : any;
  new_comment : any;
  user : any = {};
  option : boolean; // if question_post == false, it means the page 'question' should display the details of a question
  selected_question_id : any;
  selected_question : any;
  selected_answer : any;
  viewCommentBar : boolean = false;
  viewAnswerBar : boolean = false;
  viewAnswerActionBar : boolean = false;
  comment : String;
  answer : String;
  answers : any;

  inputParent:any= {};
  inputItem:any = {};
  inputValue:String ="";
  constructor(public navCtrl : NavController, public navParams : NavParams, public dataService : NewsfeedProvider, private userProvider : NativeUserProvider, public toastCtrl : ToastController, public actionSheetCtrl : ActionSheetController, private alertCtrl : AlertController,
    private renderer:Renderer, private elementRef:ElementRef,
  private nativeApiProvider: NativeApiProvider
  ) {
    this
      .userProvider
      .get()
      .then(data => {
        if (data) {
          this.user = data;
          console.log("curruser", this.user.id);
        }
      })
    this.option = this
      .navParams
      .get('option');
    this.selected_question = this
      .navParams
      .get('question');
    this.selected_question_id = this.selected_question.id;

    console.log("qUser", this.selected_question.user.id);

    this.select_tags = [];
    this.searchControl = new FormControl();
    this.selected_category = "Select category...";

    //this.user = NativeUserProvider.get();
  }

  log(d){
    console.log(d);
  }
  getDate(date){

    var date2 = new Date().getTime() - new Date(date).getTime();
    
    var seconds = Math.floor( date2 / 1000);

    if(Math.floor(seconds / 3600) >= 24)
    return new Date(date).toUTCString();

    if(Math.floor(seconds / 3600))
      return  ""+Math.floor(seconds / 3600)+" hours ago";

    if(Math.floor(seconds / 60))
        return  ""+Math.floor(seconds / 60)+" minutes ago";
    
    if(Math.floor(seconds / 1))
        return  ""+Math.floor(seconds / 1)+" seconds ago";
    
    
        return new Date(date).toUTCString();
    
  }

  post(){
    var parent = this.inputParent;
    var input = this.inputItem;
    if(!parent){
      let hold = {
        userId: this.user.id,
        questionId: this.selected_question.id,
        answer: input.value

      };
      console.log('answer',JSON.stringify(hold));
      this.nativeApiProvider.post('/Answers',hold,{}).then((data)=>{

        console.log("answer returned",JSON.stringify(data.data));

        var data2 = JSON.parse(data.data);
        data2.comments = [];
        data2.user = this.user;
        this.answers.push(data2);
        this.inputItem.value ="";
        this.viewCommentBar= false;

      }).catch(error=>{
        console.log(JSON.stringify(error));
      });
     


    }else{

      let hold = {
        userId: this.user.id,
        answerId: parent.id,
        comment: input.value
      };
      this.nativeApiProvider.post('/Comments',hold,{}).then((data)=>{

        var data2 = JSON.parse(data.data);
       
        data2.user = this.user;

        this.inputItem.comments.push(data2);
        this.inputItem.value ="";
        this.viewCommentBar= false;
      this.viewCommentBar= false;

      }).catch(error=>{
        console.log(JSON.stringify(error));
      });
     
     
    }

  }
  //////////////////////////////////////////////////////////////// -> onload

  presentActionSheet(holder, item, name) {
    let actionSheet = this
      .actionSheetCtrl
      .create({
        title: 'Options',
        buttons: [
          {
            text: 'Delete',
            role: 'delete',
            handler: () => {
              let alert = this
                .alertCtrl
                .create({
                  title: 'Confirm delete',
                  message: 'Do you want delete this ' + name + "?",
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    }, {
                      text: 'Confirm',
                      handler: () => {
                        console.log('Confirm clicked');
                        if (item) {

                          var index = holder.indexOf(item);
                          holder.splice(index, 1);

                        }
                      }
                    }
                  ]
                });
              alert.present();

              console.log('Destructive clicked');
              return true;
            }
          }, {
            text: 'Edit',
            handler: () => {
              console.log('Archive clicked');
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

              console.log('Cancel clicked');
              return true;
            }
          }
        ]
      });
    actionSheet.present();
  }
  ionViewDidLoad() {
    this.setAnswers();
    this.setCategories();
    this.setFilteredItems();
    this
      .searchControl
      .valueChanges
      .debounceTime(700)
      .subscribe(search => {
        this.setFilteredItems();
      });
    this.checkFollowStatus();
  }

  setAnswers() {
    this
      .dataService
      .getSpecificQuestionAnswers(this.selected_question_id)
      .subscribe(data => {
        console.log("ANSWERS: ", JSON.stringify(data));
        this.answers = data;
        //return data;
        
      }, err => {
        console.log("ERROR SQA");
      });
  }

  setCategories() {
    this
      .dataService
      .listCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log("ERROR C");
      });
  }

  setFilteredItems() {
    this.tags = this
      .dataService
      .filterTags(this.searchTerm);
  }
  // ////////////////////////////////////////////////////////////// -> tag
  // functions
  addTags(tag) {
    this
      .select_tags
      .push(tag);
    this.searchTerm = '';
  }

  removeTags(tag) {
    let index : number = this
      .select_tags
      .indexOf(tag);
    if (index > -1) {
      this
        .select_tags
        .splice(index, 1);
    }
  }
  // ////////////////////////////////////////////////////////////// ->
  // follow/unfollow functions

  checkFollowStatus() {
    this
      .dataService
      .followStatus(4, this.selected_question_id)
      .subscribe(data => {
        this.followed = true;
        console.log("FOLLOWED");
      }, err => {
        this.followed = false;
        console.log("NOT FOLLOWED");

      });
  }
  followQuestion() {
    // this.dataService.followQuestion(this.user, this.selected_question);
    // console.log("ME FOLLOW QUESTION");
    let put = JSON.stringify({"questionId": this.selected_question_id, "userId": 4});
    this.followed = true;
    this
      .dataService
      .followQuestion(4, this.selected_question_id, put);
    this.checkFollowStatus();
    this
      .toastCtrl
      .create({message: 'Question Followed', position: 'bottom', duration: 3000})
      .present();
  }

  unfollowQuestion() {
    //console.log("ME UNFOLLOW QUESTION");
    this
      .dataService
      .unfollowQuestion(4, this.selected_question_id);
    this.followed = false;
    this.checkFollowStatus();
    this
      .toastCtrl
      .create({message: 'Question Unfollowed', position: 'bottom', duration: 3000})
      .present();
  }
  // ////////////////////////////////////////////////////////////// ->
  // post/edit/delete comment functions

  checkBlur(e){
    if(e.relatedTarget){
    console.log( 'id',JSON.stringify(e.relatedTarget.id));
    if(e.relatedTarget.id == "send")
      return //this.post();
    else
      this.viewCommentBar = false;
    }else{
      this.viewCommentBar = false;
    }

      
  }
  showHideInputBar(parent, child) {
   
    //if(child.value)
    //
    
    //this.viewCommentBar = !(this.viewCommentBar);
    this.viewCommentBar = true;
    /*if (this.viewAnswerBar) {
      this.viewAnswerBar = !(this.viewAnswerBar);
      this.inputParent = {};
      this.inputItem = {};
    }else{*/
      if(child.value)
        this.inputItem = child;
      else{
        child.value = "";
        this.inputItem = child;
       console.log("qwe");
       

      //this.myInput['_elementRef'].nativeElement.style.height = 28 + 'px';
    
       
      }
      
      
      //console.log(JSON.stringify(child));
      this.inputParent = parent;
      
      
     
       //this.inputItem.value = value;
    //}
      
    
    }
  
  postComment() {
    console.log("Comment: ", this.comment);
    this.viewCommentBar = false;
    this.comment = '';
  }
  // ////////////////////////////////////////////////////////////// ->
  // post/edit/delete answer functions
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
      userId: this.user.id,
      questionId: this.selected_question.id,
      answer: this.answer
    };
    let data = JSON.stringify(this.new_answer);
    this
      .dataService
      .postAnswer(data)
      .subscribe(data => {
        this.setAnswers();

      });
    this.viewAnswerBar = false;
    this.answer = "";

  }

  deleteAnswer(answer_id) {
    this
      .dataService
      .deleteAnswer(answer_id)
      .subscribe(data => {
        this.setAnswers();
      });

  }
  // ////////////////////////////////////////////////////////////// ->
  // post/edit/delete question functions
  postQuestion() {
    this
      .navCtrl
      .pop();
    console.log(this.user.id);
    this.new_post = {
      userId: this.user.id,
      question: this.title,
      questiondesc: this.question,
      //'categories': this.select_categories, 'tags': this.select_tags
    };
    let data = JSON.stringify(this.new_post)
    this
      .dataService
      .postQuestion(data);

  }

}
