import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content,NavParams } from 'ionic-angular';
import { MessagingProvider } from '../../../providers/messaging/messaging';
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  

  doneLoading = false;

 
  user:any;
  convo:any;
  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;


  constructor(public messageprovider: MessagingProvider,private navParams: NavParams,public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = '';
    this.user =  this.navParams.get('globals').user;
    this.convo =  this.navParams.get('globals').convo;
    this.convo.messages=[];
    this.messageprovider.getConvo(this.user.id,this.convo.id).subscribe(
      data => {
        this.convo.messages = data;
        console.log(data);

        

      },
      err => {
        console.log("ERROR Q");
      });

  }
  ngAfterViewChecked(){
    this.content.scrollToBottom(0);
  }
  
  ionViewDidLoad() {
    this.content.scrollToBottom(0);
  }

  send(message) {
    if (message && message !== '') {
      
      this.chatBox = "";
      this.messageprovider.sendMessage(this.user.id,this.convo.id,message).subscribe(
        data => {
          this.convo.messages.push({
            id: data.id,
            message:data.message,
            created_at:data.created_at,
            senderid:data.senderId,
            conversationid:data.conversationId,
            picture: this.user.picture,
            displayname:this.user.displayname
          });
  
          this.navParams.get('globals').conversations.forEach((element,index) => {
            if(element.id == this.convo.id){
              element.last_activity = data.created_at;
              element.lastmessage = data.message;
                var hold = element;
                this.navParams.get('globals').conversations.splice(index,1);
                this.navParams.get('globals').conversations.unshift(hold);
            }
            
          });
  
        },
        err => {
          console.log("ERROR Q");
        });

    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
  ionViewWillLeave() {
    this.convo.id = null;
    this.convo.messages = [];
  }
}
function getDate(date) {

    var date2 = new Date().getTime() - new Date(date).getTime();
  
    var seconds = Math.floor(date2 / 1000);
  
    if (Math.floor(seconds / 3600) >= 24)
        return new Date(date).toUTCString();
  
    if (Math.floor(seconds / 3600))
        return "" + Math.floor(seconds / 3600) + " hours ago";
  
    if (Math.floor(seconds / 60))
        return "" + Math.floor(seconds / 60) + " minutes ago";
  
    if (Math.floor(seconds / 1))
        return "" + Math.floor(seconds / 1) + " seconds ago";
  
    return "Just now";
  
  
  
  }