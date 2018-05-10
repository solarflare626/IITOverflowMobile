import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
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


import { ProfilePage } from '../pages/profile/profile';
import { NotificationPage } from '../pages/notification/notification';
import { MessagingPage } from '../pages/messaging/messaging';
import { NewsFeedPage } from '../pages/newsfeed/newsfeed';
import { TabsPage } from '../pages/tabs/tabs';
import { QuestionPage } from '../pages/question/question';
import { AnswerPage } from '../pages/answer/answer';
import { FollowersPage } from '../pages/followers/followers';
import { FollowingPage } from '../pages/following/following';
import { AddquestionPage } from '../pages/addquestion/addquestion';

// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NativeApiProvider } from '../nativeProviders/nativeApi/nativeApi';
import { NativeUserProvider } from '../nativeProviders/nativeUser/nativeUser';
import { LoginPage } from '../pages/login/login';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProfilePage,
    NotificationPage,
    NewsFeedPage,
    MessagingPage,
    QuestionPage,
    AnswerPage,
    TabsPage,
    FollowersPage,
    FollowingPage,
    AddquestionPage,
    EditProfilePage 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
 
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
    AnswerPage,
    TabsPage,
    FollowersPage,
    FollowingPage,
    AddquestionPage,
    EditProfilePage 
  ],
  providers: [
    SplashScreen,
    StatusBar,
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
    HttpModule,NativeApiProvider,
    NativeUserProvider,
    FilePath
  ]
})

export class AppModule {}
