import { Component } from '@angular/core';

import { MessagingPage } from '../messaging/messaging';
import { NewsFeedPage } from '../newsfeed/newsfeed';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  newsfeed_tab = NewsFeedPage;
  messaging_tab = MessagingPage;
  notification_tab = NotificationPage;
  profile_tab = ProfilePage;
  edit_tab = EditProfilePage;

  constructor() {

  }
}
