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
import { BoardsListComponent } from './components/main/boards-list/boards-list.component';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BoardComponent } from './components/main/board/board.component';
import { BoardsService } from './services/boards';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    LandingComponent,
    BoardsListComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [SessionService, BoardsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
