import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/shared/app.component';
import { routing } from './components/app.routing/app.routing.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CanActivateService } from './services/canactivate.service';
import { LoginService } from './services/login-service.service';
import { DataTablesModule } from 'angular-datatables';
import { NotifService } from './services/notif-service.service';
import { BusyModule, BusyConfig} from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostService } from './services/post-service.service';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { HttpClientModule } '@angular/common/http';

export function getBusyConfig() {
  return  new BusyConfig({
    message: 'Please wait ...',
    backdrop: false,
    delay: 300,
    minDuration: 800,
    wrapperClass: 'ng-busy'
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewPostComponent,
    LoginComponent,
    NotificationComponent,
    PageNotFoundComponent,
    NewPostComponent,
    UpdatePostComponent
  ],
  imports: [
    BrowserModule,
    BusyModule.forRoot(getBusyConfig()),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTablesModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    CanActivateService,
    NotifService,
    LoginService
  ],
  bootstrap: [AppComponent, NotificationComponent]
})
export class AppModule {}
