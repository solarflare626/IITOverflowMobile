import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { App,
  ToastController, 
  AlertController } from 'ionic-angular';

import { FollowersPage } from '../../pages/followers/followers';
import { QuestionPage } from '../../pages/question/question';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
}) 
export class FollowingPage {

  curuser: any;
  user: any;
  interests: any;
  profPage: any;
  isFollowed: boolean;
  following: boolean;
  questions: any;
  questionPage: QuestionPage;
  followersusers: any;
  followerscount: any;
  followingusers: any;
  followingcount: any;
  posts: any;
  postscount: any;
  tab = 'posts';
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, 
    private alertCtrl: AlertController,
    private googlePlus: GooglePlus, 
    private dataService:UserProvider,
    public appCtrl: App) {
    this.user = this.navParams.get("user");
    this.curuser = this.navParams.get("curuser");
    this.profPage = this.navParams.get("page");
  }
    

  ionViewDidLoad() {

    this.listFollowing();
    this.listFollowers();
    this.listQuestions();
      
    this.dataService.checkFollowStatus(this.curuser, this.user.id).subscribe(
      data => {
        this.isFollowed = true;
      },
      err => {
        this.isFollowed = false;
      }
    );
    }

    getDate(date){

      var date2 = new Date().getTime() - new Date(date).getTime();
      
      var seconds = Math.floor( date2 / 1000);
  
      if(Math.floor(seconds / 3600) >= 24)
        return new Date(date).toUTCString().slice(0,-10);
  
      if(Math.floor(seconds / 3600))
        return  ""+Math.floor(seconds / 3600)+" hours ago";
  
      if(Math.floor(seconds / 60))
          return  ""+Math.floor(seconds / 60)+" minutes ago";
      
      if(Math.floor(seconds / 1))
          return  ""+Math.floor(seconds / 1)+" seconds ago";
          return new Date(date).toUTCString().slice(0,-10);
    }

  listQuestions() {
    this.dataService.listQuestions(this.user.id).subscribe(
      data => {
        this.posts = data;
      },
      err => {
        console.log("ERROR Q");
      });
      
      
      this.dataService.questionsCount(this.user.id).subscribe(
        data => {
          console.log(data);
          this.postscount = data.count;
        }
      );
  }
  
  listFollowers() {
    this.dataService.listFollowers(this.user.id).subscribe(
      data => {
        this.followersusers = data;
        console.log("Listed Followers");
      },
      err => {
        console.log("Error Followers");
      }
    );
    this.dataService.followersCount(this.user.id).subscribe(
      data => {
        console.log(data);
        this.followerscount = data.count;
      }
    );
  }

  listFollowing() {
    this.dataService.listFollowing(this.user.id).subscribe(
      data => {
        this.followingusers = data;
        console.log("Listed Following");
      },
      err => {
        console.log("Error Following");
      }
    );
    this.dataService.followingCount(this.user.id).subscribe(
      data => {
        console.log(data);
        this.followingcount = data.count;
      }
    );
    this.dataService.listInterests(this.user.id).subscribe(
      data => {
        console.log(data);
        this.interests = data;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }
  
  follow() {
    this.following = !this.following;
    this.toastCtrl.create({
      message:'User Followed',
      position: 'bottom',
      duration: 3000,

    }).present();
  }

  unfollow() {
    this.following = !this.following;
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: "By unfollowing this user, you won't be able to see the latest answers, questions that he/she will post",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  imageTapped(post) {
    this.toastCtrl.create({message:'Post image clicked'});
  }

  comment(post) {
    this.toastCtrl.create({message:'Comments clicked'});
  }

  like(post) {
    this.toastCtrl.create({message:'Like clicked'});
  }
  logout() {

    this.googlePlus.trySilentLogin({}).then(
      res => {
        this.googlePlus.logout()
        .then(res => {
          console.log("dito");
          this.dataService.delete();
          this.appCtrl.getRootNav().setRoot(LoginPage);
        })
        .catch(err => console.error(err));
      }).catch(err => console.error(err));
    
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Do not Leave Please?',
      message: 'Are you sure you to want Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Logout');
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  viewFollowerUser(user) {
    this.navCtrl.push(FollowersPage, {"user": user, "curuser": this.curuser, "page": this.profPage});
  }

  viewFollowingUser(user) {
    this.navCtrl.push(FollowingPage, {"user": user, "curuser": this.curuser, "page": this.profPage});

  }
  viewQuestion(question) {
    //this.appCtrl.getRootNav().push(QuestionPage, {option: false, question: question, questions: this.posts});
    this.navCtrl.push(QuestionPage, {"option": false, "question": question, "questions": this.posts});
  }

  followUser() {
    this.dataService.followUser(this.curuser, this.user.id).subscribe(
      data => {
        console.log("Followed User!");
        this.isFollowed = true;
        this.profPage.listFollowing();
        this.navCtrl.pop();
      }
    );
  }

  unfollowUser() {
    this.dataService.unfollowUser(this.curuser, this.user.id).subscribe(
      data => {
        console.log("Unfollowed User!");
        this.isFollowed = false;
        this.profPage.listFollowing();
        this.navCtrl.pop();
      }
    );
  }

}
