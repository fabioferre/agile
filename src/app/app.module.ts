import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { IonicStorageModule } from '@ionic/storage';
import { InterceptorService } from './service/interceptor.service';


@NgModule({
  declarations: [
    AppComponent, 
    SidebarComponent,
    HeaderComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule, 
    IonicStorageModule.forRoot({name: '_agile'}),
    IonicModule.forRoot(), 
    AppRoutingModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
