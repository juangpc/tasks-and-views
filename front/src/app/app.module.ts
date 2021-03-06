// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// router
import { RouterModule } from '@angular/router';
import {routes} from './routes';

// services
import { SessionService } from './services/session';
import { BoardService } from './services/board';
import { ViewService } from './services/view';
import { GroupService } from './services/group';
import { TaskService } from './services/task';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BoardsListComponent } from './components/main/boards-list/boards-list.component';
import { BoardComponent } from './components/main/board/board.component';
import { GroupComponent } from './components/main/group/group.component';
import { ViewComponent } from './components/main/view/view.component';
import { TaskComponent } from './components/main/task/task.component';
import { TaskListComponent } from './components/main/task-list/task-list.component';

import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    LandingComponent,
    BoardsListComponent,
    BoardComponent,
    GroupComponent,
    ViewComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    DragulaModule.forRoot()
  ],
  providers: [SessionService, BoardService, GroupService, ViewService, TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
