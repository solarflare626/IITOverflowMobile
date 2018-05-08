import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { UserProvider } from '../providers/user/user';
import { MessagingProvider } from '../providers/messaging/messaging';
import { NewsfeedProvider } from '../providers/newsfeed/newsfeed';
import { NotificationProvider } from '../providers/notification/notification';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { ApiProvider } from '../providers/api/api';

import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { NotificationPage } from '../pages/notification/notification';
import { MessagingPage } from '../pages/messaging/messaging';
import { NewsFeedPage } from '../pages/newsfeed/newsfeed';
import { TabsPage } from '../pages/tabs/tabs';
import { QuestionPage } from '../pages/question/question';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProfilePage,
    NotificationPage,
    NewsFeedPage,
    MessagingPage,
    QuestionPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationPage,
    ProfilePage,
    NewsFeedPage,
    MessagingPage,
    QuestionPage,
    TabsPage
  ],
  providers: [
    SplashScreen,
    GooglePlus,
    MessagingProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsfeedProvider,
    NotificationProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    UserProvider,
    HTTP,
    ApiProvider,
    HttpModule,
    StatusBar
  ]
})

export class AppModule {}
