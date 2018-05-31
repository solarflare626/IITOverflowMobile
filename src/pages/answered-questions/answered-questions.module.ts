import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnsweredQuestionsPage } from './answered-questions';

@NgModule({
  declarations: [
    AnsweredQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnsweredQuestionsPage),
  ],
})
export class AnsweredQuestionsPageModule {}
