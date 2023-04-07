import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { RankingComponent } from './components/dashboard/ranking/ranking.component';
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  // { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { animation: 'isLeft' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
      children: [
        { path: 'exercises', component: ExercisesComponent },
        { path: 'ranking', component: RankingComponent },
        { path: 'suggestions', component: SuggestionsComponent },
        // { path: 'exercises', component: ExercisesComponent }
      ]
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }