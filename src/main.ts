/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment} from "./environments/environment";

// https://stackoverflow.com/questions/53733807/disabling-console-log-in-production/63337190#63337190
if (environment.production) {
  window.console.log = () => { }
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
