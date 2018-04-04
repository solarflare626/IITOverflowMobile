import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../../pages/login/login';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
 
  following = false;
  user = {
    name: 'Mark Angelo G. Nambatac',
    profileImage: '../../assets/imgs/avatar/avatar.jpg',
    coverImage: '../../assets/imgs/background/background-5.jpg',
    occupation: 'Student',
    college: 'SCS',
    course: 'Computer Science',
    description: 'A wise man once said: The more you do something, the better you will become at it.',
    interests: ['Python', 'Javascript', 'Web Development'],
    followers: 456,
    following: 1052,
    posts: 35
  };

  posts = [
    {
      postImageUrl: '../../assets/imgs/background/background-2.jpg',
      mainQuestion: 'How to declare a variable in Javascript?',
      text: `Hi Guys, I am having a hard time on learning javascript. Can someone help me on how to declare a variable in javascript?`,
      date: 'April 1, 2018',
      likes: 12,
      comments: 4,
      timestamp: '11h ago',
      categories: [ 'python', 'web development']
    },
    {
      postImageUrl: '../../assets/imgs/background/background-3.jpg',
      mainQuestion: 'Unsaon pag padakog itlog?',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: '../../assets/imgs/background/background-4.jpg',
      mainQuestion: 'Unsay course ang pinaka ayos sa IIT?',
      date: 'June 28, 2016',
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: '4mo ago'
    },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private alertCtrl: AlertController,
    private googlePlus: GooglePlus, 
     private userProvider:UserProvider,
    public appCtrl: App) {


      
     }

  ionViewDidLoad() {
    console.log('Hello ProfileFour Page');
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

}

