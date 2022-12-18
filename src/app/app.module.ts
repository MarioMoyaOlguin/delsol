import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './start/login/login.component';
import { HomeComponent } from './start/home/home.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewStoreComponent } from './new-store/new-store.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { PollWelcomeComponent } from './poll-welcome/poll-welcome.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { ChooseDepComponent } from './choose-dep/choose-dep.component';
import { CommentsComponent } from './comments/comments.component';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { CreatePollPrototypeComponent } from './create-poll-prototype/create-poll-prototype.component';
import { EncuestaCreadaComponent } from './encuesta-creada/encuesta-creada.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { NpsComponent } from './nps/nps.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ButtonComponent,
    NewUserComponent,
    NewStoreComponent,
    NewPollComponent,
    MyPollsComponent,
    PollWelcomeComponent,
    UserExperienceComponent,
    ChooseDepComponent,
    CommentsComponent,
    ThanksScreenComponent,
    DashboardComponent,
    CreatePollComponent,
    CreatePollPrototypeComponent,
    EncuestaCreadaComponent,
    CalificacionComponent,
    NpsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
