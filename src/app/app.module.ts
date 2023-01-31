import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

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
import { UsersListComponent } from './users/users-list/users-list.component';
import { PanelComponent } from './users/panel/panel.component';
import { ModulesComponent } from './modules/modules.component';
import { registerLocaleData } from '@angular/common';
import { QuestionTypeComponent } from './questions/question-type/question-type.component';
import { OpcionComponent } from './questions/opcion/opcion.component';
import { PollViewerComponent } from './poll-viewer/poll-viewer.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { PollMenuComponent } from './poll-menu/poll-menu.component';
import { ModulesMenuComponent } from './modules-menu/modules-menu.component';
import { PollsChartsComponent } from './polls-charts/polls-charts.component';



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
    UsersListComponent,
    PanelComponent,
    ModulesComponent,
    QuestionTypeComponent,
    OpcionComponent,
    PollViewerComponent,
    RouteSelectorComponent,
    PollMenuComponent,
    ModulesMenuComponent,
    PollsChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
