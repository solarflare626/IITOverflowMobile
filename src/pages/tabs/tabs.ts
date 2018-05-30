import { Component } from '@angular/core';

import { ChatsPage } from '../chat/chat';
import { NewsFeedPage } from '../newsfeed/newsfeed';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  newsfeed_tab = NewsFeedPage;
  messaging_tab = ChatsPage;
  notification_tab = NotificationPage;
  profile_tab = ProfilePage;
  edit_tab = EditProfilePage;

  constructor() {

  }
}
