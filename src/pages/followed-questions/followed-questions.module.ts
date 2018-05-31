import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowedQuestionsPage } from './followed-questions';

@NgModule({
  declarations: [
    FollowedQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowedQuestionsPage),
  ],
})
export class FollowedQuestionsPageModule {}
