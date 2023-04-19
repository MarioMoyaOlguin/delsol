import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { CreatePollPrototypeComponent } from './create-poll-prototype/create-poll-prototype.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { NewStoreComponent } from './new-store/new-store.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './start/home/home.component';
import { LoginComponent } from './start/login/login.component';
import { EncuestaCreadaComponent } from './encuesta-creada/encuesta-creada.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PanelComponent } from './users/panel/panel.component';
import { ModulesComponent } from './modules/modules.component';
import { PollMenuComponent } from './poll-menu/poll-menu.component';
import { ModulesMenuComponent } from './modules-menu/modules-menu.component';
import { NewModuleComponent } from './new-module/new-module.component';
import { LoginGuardian } from './guardians/login.guardian';
import { AdminGuardian } from './guardians/admin.guardian';
import { SuperadminGuardian } from './guardians/superadmin.guardian';
import { AdminSuperadminGuardian } from './guardians/admin-superadmin.guardian';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent,  },
  { path: 'nuevo-usuario', component: NewUserComponent,  },
  { path: 'nueva-tienda', component: NewStoreComponent,  },
  { path: 'nueva-encuesta', component: NewPollComponent,  },
  { path: 'mis-encuestas', component: MyPollsComponent,  },
  { path: 'dashboard', component: DashboardComponent,  },
  { path: 'crear-encuesta', component: CreatePollComponent,  },
  { path: 'prototipo-crear-cuestionario', component: CreatePollPrototypeComponent,  },
  { path: 'encuesta-creada', component: EncuestaCreadaComponent,  },
  { path: 'usuarios', component: PanelComponent,  },
  { path: 'lista-usuarios', component: UsersListComponent,  },
  { path: 'lista-modulos', component: ModulesComponent,  },
  { path: 'encuestas', component: PollMenuComponent,  },
  { path: 'configuracion', component: ModulesMenuComponent,  },
  { path: 'nuevo-modulo', component: NewModuleComponent,  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
