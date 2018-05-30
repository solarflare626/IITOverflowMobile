import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAnswerPage } from './add-answer';

@NgModule({
  declarations: [
    AddAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAnswerPage),
  ],
})
export class AddAnswerPageModule {}
