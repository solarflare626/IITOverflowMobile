import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MessagesPage } from '../../pages/chat/messages/messages'

@IonicPage()
@Component({
  templateUrl: 'chat.html',
})

export class ChatsPage {

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

  constructor(public navCtrl: NavController) {}

  viewMessages(chat) {
    this.navCtrl.push(MessagesPage, { chatId: chat.id });
  }
}
