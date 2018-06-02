import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ChatsPage} from '../chat/chat';
import {NewsFeedPage} from '../newsfeed/newsfeed';
import {NotificationPage} from '../notification/notification';
import {ProfilePage} from '../profile/profile';
import {EditProfilePage} from '../edit-profile/edit-profile';
import * as io from "socket.io-client";
import {UserProvider} from '../../providers/user/user';

import {MessagingProvider} from '../../providers/messaging/messaging';

var globals : any = {};
globals.hold = {
  notif: 0,
  message: 0,
  question: 0
}
class BaseClass{
  id: string;
}
var notifications:Array<BaseClass> = new Array<BaseClass>();
var questions:Array<BaseClass> = new Array<BaseClass>();
var conversations:Array<BaseClass> = new Array<BaseClass>();
globals.notifications = notifications;
globals.questions =questions;
globals.conversations = conversations;
globals.convo = {
  id: null,
  messages: []
};
var followedUsers:Array<BaseClass> = new Array<BaseClass>();
var interests:Array<BaseClass> = new Array<BaseClass>();
var followedQuestions:Array<BaseClass> = new Array<BaseClass>();
globals.followedUsers = followedUsers;
globals.interests = interests;
globals.followedQuestions = followedQuestions;
globals.user = {};
@Component({templateUrl: 'tabs.html'})
export class TabsPage {


  newsfeed_tab = NewsFeedPage;
  messaging_tab = ChatsPage;
  notification_tab = NotificationPage;
  profile_tab = ProfilePage;
  edit_tab = EditProfilePage;
  chatSocket : any;
  notificationSocket : any;

  notifCount : Observable < number >;
  messageCount = 0;
  questionCount = 0;
  holdGlobals : any;
  badge : any;
  user : any = {
    "email": "roy.raposonjr@g.msuiit.edu.ph",
    "displayname": "ROY RAPOSON JR",
    "picture": "https://lh5.googleusercontent.com/-6_jcmzhWhBM/AAAAAAAAAAI/AAAAAAAAAAA/AIcfdXCMj" +
        "cGHOu8m8ELUNY2qMB20z2C3Qg/s96-c/photo.jpg",
    "createdAt": "2018-05-12T14:32:52.409Z",
    "updatedAt": "2018-05-12T14:32:50.972Z",
    "deletedAt": null,
    "id": 5
  };
  // user: any =
  // {"email":"markangelo.nambatac@g.msuiit.edu.ph","displayname":"Mark Angelo
  // Nambatac","picture":"https://lh6.googleusercontent.com/-wc_otT6fz2o/AAAAAAAAA
  // A
  // I/AAAAAAAAAAA/AIcfdXA_DAVJP73IH3uNlQe65lS0c6ZTEA/s96-c/photo.jpg","createdAt"
  // :
  // "2018-05-09T06:32:38.848Z","updatedAt":"2018-05-09T06:32:38.843Z","deletedAt"
  // : null,"id":15};
  constructor(private userprovider : UserProvider, private messageprovider : MessagingProvider) {
    globals.messageprovider = this.messageprovider;

    globals.user = {
      "email": "roy.raposonjr@g.msuiit.edu.ph",
      "displayname": "ROY RAPOSON JR",
      "picture": "https://lh5.googleusercontent.com/-6_jcmzhWhBM/AAAAAAAAAAI/AAAAAAAAAAA/AIcfdXCMj" +
          "cGHOu8m8ELUNY2qMB20z2C3Qg/s96-c/photo.jpg",
      "createdAt": "2018-05-12T14:32:52.409Z",
      "updatedAt": "2018-05-12T14:32:50.972Z",
      "deletedAt": null,
      "id": 5
    };
    // globals.user
    // ={"email":"markangelo.nambatac@g.msuiit.edu.ph","displayname":"Mark Angelo
    // Nambatac","picture":"https://lh6.googleusercontent.com/-wc_otT6fz2o/AAAAAAAAA
    // A
    // I/AAAAAAAAAAA/AIcfdXA_DAVJP73IH3uNlQe65lS0c6ZTEA/s96-c/photo.jpg","createdAt"
    // :
    // "2018-05-09T06:32:38.848Z","updatedAt":"2018-05-09T06:32:38.843Z","deletedAt"
    // : null,"id":15};
    this.holdGlobals = {
      globals: globals
    };
    //var socketUrl = 'http://localhost:3000';
    var socketUrl = "https://iitoverflow.herokuapp.com";

    this
      .messageprovider
      .getConversations(globals.user.id)
      .subscribe(data => {
        globals.conversations = data;

      }, err => {
        console.log("ERROR Q");
      });
    this
      .userprovider
      .getIntersts(globals.user.id)
      .subscribe(data => {
        globals.interests = data;

      }, err => {
        console.log("ERROR Q");
      });

    this
      .userprovider
      .getFollowedQuestions(globals.user.id)
      .subscribe(data => {
        globals.followedQuestions = data;

      }, err => {
        console.log("ERROR Q");
      });
    this
      .userprovider
      .getFollowedUsers(globals.user.id)
      .subscribe(data => {
        globals.followedUsers = data;

      }, err => {
        console.log("ERROR Q");
      });

    this
      .userprovider
      .getNotifications(globals.user.id)
      .subscribe(data => {
        globals.notifications = data;
        globals
          .notifications
          .forEach(element => {
            if (element.type == "newQuestion") 
              element.placeholder = "posted a new question: " + element.question.question;
            else if (element.type == "newAnswer") {
              if (element.question.userId == globals.user.id) {
                element.placeholder = "answered your question: " + element.answer.answer;
              } else if ($.grep(globals.followedQuestions, function (obj:BaseClass) {
                return obj.id === element.question.id;
              })[0]) {
                element.placeholder = "answered a question you\'re following: " + element.answer.answer;
              }
            }else if(element.type == "newComment"){
              element.placeholder = "commented on your answer: " + element.comment.comment;

            }

          });

      }, err => {
        console.log("ERROR Q");
      });
    this.chatSocket = io(socketUrl + '/chat');
    this.notificationSocket = io(socketUrl + '/notification');
    this.notificationSocket.on('newQuestion', function(data) {
      console.log("New Question");
      data.createdAt = Date.now();
      
      
      if (data.question.userId != globals.user.id)
          if ($.grep(globals.followedUsers, function(obj:BaseClass) {
                  return obj.id === data.question.userId;
              })[0] || $.grep(globals.interests, function(obj:BaseClass) {
                  return obj.id === data.question.categoryId;
              })[0]) {
              globals.notifications.unshift(data);
              globals.hold.notif++;
              data.placeholder = '</strong> posted a new Question: ' + data.question.question; 

          }
  });
  this.notificationSocket.on('newAnswer', function(data) {
    data.createdAt = Date.now();
    console.log("New Answer");
    if (data.answer.userId != globals.user.id)
        if (data.question.userId == globals.user.id) {
          data.placeholder = "answered your question: " + data.answer.answer;
          globals.notifications.unshift(data);
          globals.hold.notif++;
        } else if ($.grep(globals.followedQuestions, function (obj:BaseClass) {
          return obj.id === data.question.id;
        })[0]) {
          data.placeholder = "answered a question you\'re following: " + data.answer.answer;
          globals.hold.notif++;
          globals.notifications.unshift(data);
        }
});
this.notificationSocket.on('newComment', function(data) {
  data.createdAt = Date.now();
  console.log("New Comment");
  if (data.comment.userId != globals.user.id && data.answer.userId ==  globals.user.id){
    data.placeholder = 'commented on your answer: ' + data.comment.comment;
    globals.notifications.unshift(data);
    globals.hold.notif++;
  }
});

    this
      .chatSocket
      .on('connect', function (socket) {

        console.log("connected");

      });
    this
      .chatSocket
      .on('wentOffline', function (data) {
        globals
          .conversations
          .forEach(element => {
            if (element.userid == data.user) {
              element.online = false;
            }
          });
        console.log(data.user, " is now offline");
      });
    this
      .chatSocket
      .on('wentOnline', function (data) {
        globals
          .conversations
          .forEach(element => {
            if (element.userid == data.user) {
              element.online = true;
            }
          });
        console.log(data.user, " is now online");
      });
    this
      .chatSocket
      .emit("connected", {id: globals.user.id});

    this
      .chatSocket
      .on('message', function (data) {
        console.log("Newmessage");
        if(!($.grep(globals
          .conversations, function (obj:BaseClass) {
          return obj.id === "solo_" + data.message.conversationId;
        })[0])){
            console.log("Mustplace");
            globals.messageprovider.getNewConvo(globals.user.id,data.message.senderId).subscribe(newConvo => {
              globals.conversations.unshift(newConvo);
      
            }, err => {
              console.log("ERROR Q");
            });
        }
        console.log(data);
        globals
          .conversations
          .forEach((element, index) => {

            if ("solo_" + data.message.conversationId == element.id) {
              
              if (globals.convo.id != null && data.message.conversationId != globals.convo.id.split('_')[1]) {
                element.unread++;

              } else if (globals.convo.id == null) {
                element.unread++;
              } else {

                globals
                  .convo
                  .messages
                  .push({
                    id: data.message.id,
                    conversationid: data.message.conversationId,
                    senderid: data.message.senderId,
                    created_at: data.message.created_at,
                    message: data.message.message,
                    picture: data.user.picture,
                    displayname: data.user.displayname
                  });
              }

              element.lastmessage = data.message.message;
              element.last_activity = data.message.created_at;

              var hold = element;
              globals
                .conversations
                .splice(index, 1);
              globals
                .conversations
                .unshift(hold);
            }

          });
      });

  }
  public unshift(element) {}

  unreadConvo() {
    var count = 0;
    globals
      .conversations
      .forEach(element => {
        count += element.unread;
      });

    return count;

  }
  unreadNotif(){
    return globals.hold.notif;
  }
  unreadQuestion(){
    return globals.hold.question;
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