import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
    
    notifications: any;
 
    constructor(public http: Http) {
        this.notifications = [
            {
                "type": 'User',
                "content": 'Espinoyyy007 has followed you.',
                "profileImage": "../../assets/imgs/avatar/phillip.jpg"


            },
            {
                type: 'Question',
                content: 'makoooy123 answered your question.',
                profileImage: "../../assets/imgs/avatar/images.jpg"
            },
            {
                type: 'Question',
                content: 'Roooooyy789 commented on your question.',
                profileImage: "../../assets/imgs/avatar/test2.jpg"
            }
        ];

        //this.http.get('').map(res => res.json()).subscribe(
        //    data => {
        //        this.posts = data.data.children;
        //        console.log(this.posts);
        //    },
        //    err => {
        //        console.log('Banga!');
        //    }
        //);
 
    }
 
    listNotifications(){
 
        return this.notifications;   
 
    }

}
