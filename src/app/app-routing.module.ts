import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ChooseDepComponent } from './choose-dep/choose-dep.component';
import { CommentsComponent } from './comments/comments.component';
import { CreatePollPrototypeComponent } from './create-poll-prototype/create-poll-prototype.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { NewStoreComponent } from './new-store/new-store.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PollWelcomeComponent } from './poll-welcome/poll-welcome.component';
import { HomeComponent } from './start/home/home.component';
import { LoginComponent } from './start/login/login.component';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { EncuestaCreadaComponent } from './encuesta-creada/encuesta-creada.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { NpsComponent } from './nps/nps.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PanelComponent } from './users/panel/panel.component';
import { ModulesComponent } from './modules/modules.component';
import { PollMenuComponent } from './poll-menu/poll-menu.component';
import { ModulesMenuComponent } from './modules-menu/modules-menu.component';
import { NewModuleComponent } from './new-module/new-module.component';
import { LoginGuardian } from './start/login/login.guardian';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[LoginGuardian] },
  { path: 'nuevo-usuario', component: NewUserComponent, canActivate:[LoginGuardian] },
  { path: 'nueva-tienda', component: NewStoreComponent, canActivate:[LoginGuardian] },
  { path: 'nueva-encuesta', component: NewPollComponent, canActivate:[LoginGuardian] },
  { path: 'mis-encuestas', component: MyPollsComponent, canActivate:[LoginGuardian] },
  { path: 'bienvenida-encuesta', component: PollWelcomeComponent, canActivate:[LoginGuardian] },
  { path: 'experiencia-usuario', component: UserExperienceComponent, canActivate:[LoginGuardian] },
  { path: 'departamento-visitado', component: ChooseDepComponent, canActivate:[LoginGuardian] },
  { path: 'comentarios', component: CommentsComponent, canActivate:[LoginGuardian] },
  { path: 'encuesta-finalizada', component: ThanksScreenComponent, canActivate:[LoginGuardian] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[LoginGuardian] },
  { path: 'crear-encuesta', component: CreatePollComponent, canActivate:[LoginGuardian] },
  { path: 'prototipo-crear-cuestionario', component: CreatePollPrototypeComponent, canActivate:[LoginGuardian] },
  { path: 'encuesta-creada', component: EncuestaCreadaComponent, canActivate:[LoginGuardian] },
  { path: 'calificacion', component: CalificacionComponent, canActivate:[LoginGuardian] },
  { path: 'NPS', component: NpsComponent, canActivate:[LoginGuardian] },
  { path: 'usuarios', component: PanelComponent, canActivate:[LoginGuardian] },
  { path: 'lista-usuarios', component: UsersListComponent, canActivate:[LoginGuardian] },
  { path: 'lista-modulos', component: ModulesComponent, canActivate:[LoginGuardian] },
  { path: 'encuestas', component: PollMenuComponent, canActivate:[LoginGuardian] },
  { path: 'configuracion', component: ModulesMenuComponent, canActivate:[LoginGuardian] },
  { path: 'nuevo-modulo', component: NewModuleComponent, canActivate:[LoginGuardian] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
