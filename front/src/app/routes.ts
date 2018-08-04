import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BoardComponent } from './components/main/board/board.component';
import { BoardsListComponent } from './components/main/boards-list/boards-list.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boards/:id', component: BoardComponent},
  { path: 'boards', component: BoardsListComponent},
  { path: '**', redirectTo: '' }
];
