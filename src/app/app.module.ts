import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { HelperService } from './service/helper.service';
import { ProdutoService } from './pages/produtos/produto.service';
import { HomeService } from './pages/home/home.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { ErrorModalComponent } from './layout/error-modal/error-modal.component';
import { MaterialModule } from './material/material.module';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
 
const config: InputFileConfig = {};
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ErrorModalComponent
  ],
  entryComponents: [
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot({ name: '_agile' }),
    IonicModule.forRoot(),
    AppRoutingModule,
    OverlayModule,
    MaterialModule,
    InputFileModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    HelperService,
    ProdutoService,
    HomeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
