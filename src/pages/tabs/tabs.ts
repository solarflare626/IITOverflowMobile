import { Component } from '@angular/core';

import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { QandaPage} from '../qanda/qanda';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home_tab = HomePage;
  notif_tab = NotificationPage;
  profile_tab = ProfilePage;
  qanda_tab = QandaPage;
  chat_tab = ChatPage;

  constructor() {

  }
}
