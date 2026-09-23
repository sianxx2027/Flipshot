import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home';
import { DiscoverComponent } from './discover/discover';
import { CollectionsComponent } from './collections/collections';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    DiscoverComponent,
    CollectionsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
