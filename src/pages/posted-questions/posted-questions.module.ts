import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostedQuestionsPage } from './posted-questions';

@NgModule({
  declarations: [
    PostedQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostedQuestionsPage),
  ],
})
export class PostedQuestionsPageModule {}
