import { Component } from '@angular/core';
import { ViewController, NavController, AlertController, NavParams } from 'ionic-angular';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';
import { EditQuestionPage } from '../../pages/edit-question/edit-question'

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  items: any;
  text: string;
  question: any;

  constructor(public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public alertCtrl: AlertController,  
    public navParams: NavParams,
  private dataService: NewsfeedProvider) {
    this.items = [
      {item : "Edit Question"},
      {item : "Delete Question"},
    ]
    this.question = this.navParams.get('question');

  }

  itemClick(item){
    console.log(item.item);
    if (item.item == "Edit Question") {
      console.log("Edit Question!");
      this.navCtrl.push(EditQuestionPage, {question: this.question});
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
              this.dataService.deleteQuestion(this.question.id).subscribe(
                data => {
                  console.log("Deleted");
                }
              );
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
