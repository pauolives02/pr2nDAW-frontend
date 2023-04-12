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
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { NewSuggestionComponent } from './components/dashboard/suggestions/new-suggestion/new-suggestion.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, data: { animation: 'isLeft' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
      children: [
        { path: 'exercises', component: ExercisesComponent,
          children: [
            { path: '', component: ExerciseListComponent },
            { path: 'add', component: AddExerciseComponent },
            { path: 'detail/:id', component: ExerciseDetailComponent },
          ]
        },
        { path: 'sets', component: SetsComponent },
        { path: 'ranking', component: RankingComponent },
        { path: 'suggestions', component: SuggestionsComponent,
          children: [
            { path: '', component: NewSuggestionComponent }
          ]
        },
        { path: 'profile', component: ProfileComponent },
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