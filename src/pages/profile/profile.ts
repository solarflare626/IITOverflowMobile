import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { App, NavController, 
  IonicPage, 
  ToastController, 
  AlertController } from 'ionic-angular';
 
import { GLOBALS } from '../../models/globals';

import { LoginPage } from '../../pages/login/login';
import { FollowersPage } from '../../pages/followers/followers';
import { FollowingPage } from '../../pages/following/following';
import { QuestionPage } from '../../pages/question/question';
import { EditProfilePage } from '../../pages/edit-profile/edit-profile';
import { PostedQuestionsPage } from '../../pages/posted-questions/posted-questions';
import { AnsweredQuestionsPage } from '../../pages/answered-questions/answered-questions';
import { FollowedQuestionsPage} from '../../pages/followed-questions/followed-questions';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  following: boolean;
  questions: any;
  questionPage: QuestionPage;
  editProfilePage: EditProfilePage;
  followersusers: any;
  followerscount: any;
  followingusers: any;
  followingcount: any;
  posts: any;
  postscount: any;
  interests: any;
  categories: any;
  tab = 'posts';
  globals= new GLOBALS();
  user: any;

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    private alertCtrl: AlertController,
    private googlePlus: GooglePlus, 
    private userProvider:UserProvider,
    public appCtrl: App) {
      this
      .userProvider
      .get()
      .then(data => {
        if (data) {
          this.user = data;
          console.log("curruser", this.user.id);
        }else{
          this
        }
      })
      
    }
    

  ionViewDidLoad() {

    this.listFollowing();
    this.listFollowers();
    this.listQuestions();
    this.listInterests();
    }

  listInterests() {
    this.userProvider.listInterests(this.user.id).subscribe(
      data => {
        this.interests = data;
      },
      err => {
        console.log("Error Interests");
      }
    );
  }

  listQuestions() {
    this.userProvider.listQuestions(this.user.id).subscribe(
      data => {
        this.posts = data;
      },
      err => {
        console.log("ERROR Q");
      });
      
      
      this.userProvider.questionsCount(this.user.id).subscribe(
        data => {
          console.log(data);
          this.postscount = data.count;
        }
      );
  }
  
  listFollowers() {
    this.userProvider.listFollowers(this.user.id).subscribe(
      data => {
        this.followersusers = data;
        console.log("Listed Followers");
      },
      err => {
        console.log("Error Followers");
      }
    );
    this.userProvider.followersCount(this.user.id).subscribe(
      data => {
        console.log(data);
        this.followerscount = data.count;
      }
    );
  }

  listFollowing() {
    this.userProvider.listFollowing(this.user.id).subscribe(
      data => {
        this.followingusers = data;
        console.log("Listed Following");
      },
      err => {
        console.log("Error Following");
      }
    );
    this.userProvider.followingCount(this.user.id).subscribe(
      data => {
        console.log(data);
        this.followingcount = data.count;
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

  editProfile() {
    this.userProvider.listInterests(this.user.id).subscribe(
      data => {
        this.categories = data;
      });
    this.navCtrl.push(EditProfilePage, {"user": this.user, "categories": this.categories, "interests": this.interests});
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
          this.userProvider.delete();
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
    this.navCtrl.push(FollowersPage, {"user": user, "curuser": this.user.id, "page": this});
  }

  viewFollowingUser(user) {
    this.navCtrl.push(FollowingPage, {"user": user, "curuser": this.user.id, "page": this});

  }
  viewPostedQuestions() {
    this.navCtrl.push(PostedQuestionsPage, {"curuser": this.user});
  }
  viewAnsweredQuestions() {
    this.navCtrl.push(AnsweredQuestionsPage, {"curuser": this.user});
  }
  viewFollowedQuestions() {
    this.navCtrl.push(FollowedQuestionsPage, {"curuser": this.user});
  }
}

