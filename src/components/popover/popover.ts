import { Component } from '@angular/core';
import { ViewController, NavController, AlertController, NavParams } from 'ionic-angular';

import { EditQuestionPage } from '../../pages/edit-question/edit-question'

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  items: any;
  text: string;

  constructor(public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public alertCtrl: AlertController,  
    public navParams: NavParams) {
    this.items = [
      {item : "Edit Question"},
      {item : "Delete Question"},
    ]
    let questionHead = this.navParams.get('question');
    let questionDesc = this.navParams.get('questiondesc');

  }

  itemClick(item){
    console.log(item.item);
    if (item.item == "Edit Question") {
      console.log("Edit Question!");
      this.navCtrl.push(EditQuestionPage, {question1: this.navParams.get('question'), question2:this.navParams.get('questiondesc')});
    } else if (item.item == "Delete Question") {
      let alert = this.alertCtrl.create({
        title: 'Delete Question',
        message: 'Are you sure you want to delete this question?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              console.log('Delete Confirmed');
            }
          }
        ]
      });
      alert.present();
      console.log("Delete Question");

    }
    this.viewCtrl.dismiss(item);
  }

 
}
