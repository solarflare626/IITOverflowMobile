import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NotificationPage } from '../pages/notification/notification';
import { MessagingPage } from '../pages/messaging/messaging';
import { ProfilePage } from '../pages/profile/profile';
import { NewsFeedPage } from '../pages/newsfeed/newsfeed';
import { TabsPage } from '../pages/tabs/tabs';
import { QuestionPage } from '../pages/question/question';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessagingProvider } from '../providers/messaging/messaging';
import { NewsfeedProvider } from '../providers/newsfeed/newsfeed';
import { NotificationProvider } from '../providers/notification/notification';

@NgModule({
  declarations: [
    MyApp,
    NotificationPage,
    ProfilePage,
    NewsFeedPage,
    MessagingPage,
    QuestionPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationPage,
    ProfilePage,
    MessagingPage,
    NewsFeedPage,
    QuestionPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MessagingProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsfeedProvider,
    NotificationProvider
  ]
})
export class AppModule {}
