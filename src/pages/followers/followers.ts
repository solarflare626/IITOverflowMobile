import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { App,
  ToastController, 
  AlertController } from 'ionic-angular';

/**
 * Generated class for the FollowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {

  curuser: any;
  user: any;
  interests: any;
  profPage: any;
  isFollowed: boolean;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: UserProvider) {
    this.user = this.navParams.get("user");
    this.curuser = this.navParams.get("curuser");
    this.profPage = this.navParams.get("page");
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad FollowingPage');
      this.dataService.listInterests(this.user.id).subscribe(
        data => {
          console.log(data);
          this.interests = data;
        },
        err => {
          console.log("Error: ",err);
        }
      );
      this.dataService.checkFollowStatus(this.curuser, this.user.id).subscribe(
        data => {
          this.isFollowed = true;
        },
        err => {
          this.isFollowed = false;
        }
      );
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
