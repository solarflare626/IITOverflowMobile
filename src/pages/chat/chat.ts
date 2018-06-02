import { Component } from '@angular/core';
import { NavController, IonicPage , NavParams} from 'ionic-angular';

  import { MessagesPage } from '../../pages/chat/messages/messages'
  import { MessagingProvider } from '../../providers/messaging/messaging';
  
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatsPage {

  chatlist:any;
  convo: any;
  chats = [{
    imageUrl: '../../assets/imgs/avatar/phillip.jpg',
    title: 'McFly',
    lastMessage: 'Hey, what happened yesterday?',
    timestamp: new Date()
  },
  {
    imageUrl: '../../assets/imgs/avatar/test2.jpg',
    title: 'Venkman',
    lastMessage: 'Sup, dude',
    timestamp: new Date()
  }
  ,
  {
    imageUrl: '../../assets/imgs/avatar/images.jpg',
    title: 'Sarah Mcconnor',
    lastMessage: 'You still ow me that pizza.',
    timestamp: new Date()
  }];

  globals:any = {};
  constructor(private navParams: NavParams,public navCtrl: NavController,public dataService: MessagingProvider) {

    this.chatlist = this.navParams.get('globals').conversations;
    this.convo =  this.navParams.get('globals').convo;
    this.globals = this.navParams.get('globals');
  }

  viewMessages(chat) {
    this.convo.id = chat.id;
    chat.unread = 0;
    this.convo.messages=[];
    this.navCtrl.push(MessagesPage, { chatId: chat.id ,globals:this.navParams.get('globals')});
  }
  ionViewDidLoad() {
    

  }
  ionSelected(){
    this
      .dataService
      .getConversations(this.globals.user.id)
      .subscribe(data => {
        this.globals.conversations = data;

      }, err => {
        console.log("ERROR Q");
      });
}

  getDate(date) {

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
}

