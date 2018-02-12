import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { CommonModule } from '@angular/common';
import { NgCalendarModule } from 'ionic2-calendar';
import { FormsModule } from '@angular/forms';

import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { AuthProvider } from '../providers/auth/auth';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    CommonModule,
    NgCalendarModule,
    SignUpPageModule,
    ResetPasswordPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    ResetPasswordPage,
    HomePage
  ],
  providers: [
    Calendar,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,

  ]
})
export class AppModule {}
