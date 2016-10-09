import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login.component';
import { NavComponent } from './components/nav.component';
import { ItemsComponent } from './components/items.component';
import { PrivateComponent } from './components/private.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: PrivateComponent
      }
    ])
  ],
  declarations: [AppComponent, LoginComponent, NavComponent, ItemsComponent, PrivateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
