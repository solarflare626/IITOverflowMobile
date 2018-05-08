import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;
